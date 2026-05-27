require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");
const { buildHtml } = require("./templates/email");
const { buildConfirmationHtml, getConfirmationSubject } = require("./templates/confirmation");

const app = express();
const PORT = process.env.PORT || 3001;
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// ─── Walidacja zmiennych środowiskowych ──────────────────────────────────────
const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "CONTACT_EMAIL_TO"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error("Brakujące zmienne środowiskowe:", missing.join(", "));
  console.error("Skopiuj .env.example do .env i uzupełnij wartości.");
  process.exit(1);
}

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "20kb" }));

app.use(
  cors({
    origin: corsOrigins,
    methods: ["POST", "OPTIONS"],
  })
);

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5"),
  message: { success: false, error: "Za dużo zgłoszeń. Spróbuj ponownie za 15 minut." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Tłumaczenia błędów walidacji ─────────────────────────────────────────────
const FIELD_ERRORS = {
  pl: {
    name: "Podaj imię i nazwisko (min. 2 znaki)",
    email: "Podaj poprawny adres e-mail",
    message: "Wiadomość jest za krótka (min. 5 znaków)",
    citizenship: "Podaj obywatelstwo (min. 2 znaki)",
    purpose: "Wybierz cel przyjazdu",
    duration: "Wybierz planowany czas pobytu",
    job_offer: "Zaznacz odpowiedź",
    family_in_poland: "Zaznacz odpowiedź",
    invalid_form: "Nieprawidłowy typ formularza.",
    validation_error: "Błąd walidacji danych.",
  },
  en: {
    name: "Please enter your full name (min. 2 characters)",
    email: "Please enter a valid email address",
    message: "Message is too short (min. 5 characters)",
    citizenship: "Please enter your citizenship (min. 2 characters)",
    purpose: "Please select a purpose of visit",
    duration: "Please select your planned length of stay",
    job_offer: "Please select an answer",
    family_in_poland: "Please select an answer",
    invalid_form: "Invalid form type.",
    validation_error: "Validation error.",
  },
  ru: {
    name: "Введите имя и фамилию (мин. 2 символа)",
    email: "Введите корректный адрес электронной почты",
    message: "Сообщение слишком короткое (мин. 5 символов)",
    citizenship: "Укажите гражданство (мин. 2 символа)",
    purpose: "Выберите цель приезда",
    duration: "Выберите планируемый срок пребывания",
    job_offer: "Выберите один из вариантов",
    family_in_poland: "Выберите один из вариантов",
    invalid_form: "Неверный тип формы.",
    validation_error: "Ошибка валидации данных.",
  },
  ua: {
    name: "Введіть ім'я та прізвище (мін. 2 символи)",
    email: "Введіть коректну адресу електронної пошти",
    message: "Повідомлення надто коротке (мін. 5 символів)",
    citizenship: "Вкажіть громадянство (мін. 2 символи)",
    purpose: "Оберіть мету приїзду",
    duration: "Оберіть запланований термін перебування",
    job_offer: "Оберіть один із варіантів",
    family_in_poland: "Оберіть один із варіантів",
    invalid_form: "Невірний тип форми.",
    validation_error: "Помилка валідації даних.",
  },
};

const VALID_LANGS = ["pl", "en", "ru", "ua"];

function getLang(raw) {
  return VALID_LANGS.includes(raw) ? raw : "pl";
}

function buildGeneralSchema(lang) {
  const e = FIELD_ERRORS[lang];
  return z.object({
    formType: z.literal("general"),
    lang: z.enum(["pl", "en", "ru", "ua"]).default("pl"),
    name: z.string().min(2, e.name).max(100),
    email: z.string().email(e.email),
    phone: z.string().max(30).optional().or(z.literal("")),
    message: z.string().min(5, e.message).max(2000),
  });
}

function buildVisaSchema(lang) {
  const e = FIELD_ERRORS[lang];
  return z.object({
    formType: z.literal("visa"),
    lang: z.enum(["pl", "en", "ru", "ua"]).default("pl"),
    email: z.string().email(e.email),
    citizenship: z.string().min(2, e.citizenship).max(100),
    purpose: z.enum(["praca", "biznes", "studia", "rodzina", "inne"], { errorMap: () => ({ message: e.purpose }) }),
    duration: z.enum(["do_3m", "3_6m", "6_12m", "powyzej_roku"], { errorMap: () => ({ message: e.duration }) }),
    job_offer: z.enum(["tak", "nie", "w_trakcie"], { errorMap: () => ({ message: e.job_offer }) }),
    family_in_poland: z.enum(["tak", "nie"], { errorMap: () => ({ message: e.family_in_poland }) }),
  });
}

// ─── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Pomocnicze: etykiety pól ─────────────────────────────────────────────────
const purposeLabels = {
  praca: "Praca",
  biznes: "Biznes / inwestycja",
  studia: "Studia",
  rodzina: "Łączenie rodzin",
  inne: "Inne",
};

const durationLabels = {
  do_3m: "Do 3 miesięcy",
  "3_6m": "3–6 miesięcy",
  "6_12m": "6–12 miesięcy",
  powyzej_roku: "Powyżej roku",
};

const yesNoLabels = {
  tak: "Tak",
  nie: "Nie",
  w_trakcie: "W trakcie rozmów",
};

// ─── Endpoint ─────────────────────────────────────────────────────────────────
app.post("/contact", limiter, async (req, res) => {
  const body = req.body || {};

  // Honeypot — _hp musi być pustym stringiem; brak pola = bezpośrednie żądanie
  if (body._hp !== "") {
    return res.json({ success: true });
  }

  // Minimalny czas wypełnienia: 3 sekundy
  const elapsed = parseInt(body._t ?? "0", 10);
  if (isNaN(elapsed) || elapsed < 3000) {
    return res.json({ success: true });
  }

  const { formType } = body;
  const lang = getLang(body.lang);
  const e = FIELD_ERRORS[lang];

  if (formType !== "general" && formType !== "visa") {
    return res.status(400).json({ success: false, error: e.invalid_form });
  }

  const schema = formType === "general" ? buildGeneralSchema(lang) : buildVisaSchema(lang);
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.errors[0]?.message || e.validation_error;
    return res.status(400).json({ success: false, error: message });
  }

  const data = result.data;

  // Buduj listę pól do maila
  const fields =
    formType === "general"
      ? [
          { label: "Imię i nazwisko", value: data.name },
          { label: "Adres e-mail", value: data.email },
          { label: "Telefon", value: data.phone || "—" },
          { label: "Wiadomość", value: data.message },
        ]
      : [
          { label: "Adres e-mail", value: data.email },
          { label: "Obywatelstwo", value: data.citizenship },
          { label: "Cel przyjazdu do Polski", value: purposeLabels[data.purpose] },
          { label: "Planowany czas pobytu", value: durationLabels[data.duration] },
          { label: "Oferta pracy w Polsce", value: yesNoLabels[data.job_offer] },
          { label: "Rodzina w Polsce", value: yesNoLabels[data.family_in_poland] },
        ];

  const subject =
    formType === "general"
      ? `Nowe zgłoszenie — konsultacja ogólna (${data.name})`
      : `Nowe zgłoszenie — kwalifikacja wizowa (${data.email})`;

  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const logoUrl = process.env.LOGO_URL || `${siteUrl}/logo-footer.svg`;

  const html = buildHtml({
    formType,
    fields,
    logoUrl,
    siteUrl,
    replyTo: data.email,
  });

  const confirmationHtml = buildConfirmationHtml({
    formType,
    lang: data.lang,
    name: formType === "general" ? data.name : undefined,
    logoUrl,
    siteUrl,
  });

  const confirmationSubject = getConfirmationSubject(data.lang);

  try {
    const [info, confirmationInfo] = await Promise.all([
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL_TO,
        replyTo: data.email,
        subject,
        html,
      }),
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: data.email,
        subject: confirmationSubject,
        html: confirmationHtml,
      }),
    ]);

    // W dev: wypisz linki do podglądu Ethereal
    if (process.env.NODE_ENV !== "production") {
      const previewBiuro = nodemailer.getTestMessageUrl(info);
      const previewKlient = nodemailer.getTestMessageUrl(confirmationInfo);
      if (previewBiuro) console.log("📧 Mail do biura:  ", previewBiuro);
      if (previewKlient) console.log("📧 Mail do klienta:", previewKlient);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Błąd wysyłania maila:", err.message);
    return res.status(500).json({ success: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz do nas bezpośrednio." });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Mail API uruchomione na porcie ${PORT} (${process.env.NODE_ENV || "development"})`);
});
