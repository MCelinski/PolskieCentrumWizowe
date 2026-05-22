const NAVY = "#041c2d";
const RED = "#c42021";
const CREAM = "#f8f7f4";
const GREY = "#6b7280";
const BORDER = "#e5e0d8";

const TRANSLATIONS = {
  pl: {
    badge: "Potwierdzenie zgłoszenia",
    redLabel: "Dziękujemy za kontakt",
    h1: "Otrzymaliśmy Twoje zgłoszenie",
    greetingNamed: (name) => `Szanowny/a ${name},`,
    greetingAnon: "Szanowni Państwo,",
    formLabel: { visa: "kwalifikacji wizowej", general: "konsultacji ogólnej" },
    body1: (label) => `Potwierdzamy otrzymanie Twojego zgłoszenia dotyczącego <strong>${label}</strong>. Nasz zespół zapozna się z Twoją sprawą i skontaktuje się z Tobą w ciągu <strong>24 godzin roboczych</strong>.`,
    body2: "Jeśli masz pilne pytania, możesz się z nami skontaktować bezpośrednio.",
    contactHeader: "Dane kontaktowe",
    hours: "Pon–Pt: 9:00–17:00",
    disclaimer: "Ta wiadomość została wysłana automatycznie jako potwierdzenie otrzymania zgłoszenia. Prosimy nie odpowiadać na tego maila — nasz konsultant skontaktuje się z Tobą bezpośrednio.",
    subject: "Potwierdzenie zgłoszenia — Polskie Centrum Wizowe",
  },
  en: {
    badge: "Submission confirmation",
    redLabel: "Thank you for contacting us",
    h1: "We have received your inquiry",
    greetingNamed: (name) => `Dear ${name},`,
    greetingAnon: "Dear Sir/Madam,",
    formLabel: { visa: "visa qualification", general: "general consultation" },
    body1: (label) => `We confirm receipt of your <strong>${label}</strong> inquiry. Our team will review your case and contact you within <strong>24 business hours</strong>.`,
    body2: "If you have any urgent questions, please contact us directly.",
    contactHeader: "Contact details",
    hours: "Mon–Fri: 9:00–17:00",
    disclaimer: "This message was sent automatically as confirmation of your submission. Please do not reply to this email — our consultant will contact you directly.",
    subject: "Submission confirmation — Polskie Centrum Wizowe",
  },
  ru: {
    badge: "Подтверждение заявки",
    redLabel: "Спасибо за обращение",
    h1: "Мы получили Вашу заявку",
    greetingNamed: (name) => `Уважаемый/ая ${name},`,
    greetingAnon: "Уважаемые господа,",
    formLabel: { visa: "визовой квалификации", general: "общей консультации" },
    body1: (label) => `Подтверждаем получение Вашей заявки по вопросу <strong>${label}</strong>. Наша команда рассмотрит Вашу ситуацию и свяжется с Вами в течение <strong>24 рабочих часов</strong>.`,
    body2: "Если у Вас есть срочные вопросы, свяжитесь с нами напрямую.",
    contactHeader: "Контактные данные",
    hours: "Пн–Пт: 9:00–17:00",
    disclaimer: "Это сообщение было отправлено автоматически в качестве подтверждения получения заявки. Пожалуйста, не отвечайте на это письмо — наш консультант свяжется с Вами напрямую.",
    subject: "Подтверждение заявки — Polskie Centrum Wizowe",
  },
  ua: {
    badge: "Підтвердження заявки",
    redLabel: "Дякуємо за звернення",
    h1: "Ми отримали Вашу заявку",
    greetingNamed: (name) => `Шановний/а ${name},`,
    greetingAnon: "Шановні добродії,",
    formLabel: { visa: "візової кваліфікації", general: "загальної консультації" },
    body1: (label) => `Підтверджуємо отримання Вашої заявки щодо <strong>${label}</strong>. Наша команда розгляне Вашу ситуацію та зв'яжеться з Вами протягом <strong>24 робочих годин</strong>.`,
    body2: "Якщо у Вас є термінові питання, зверніться до нас безпосередньо.",
    contactHeader: "Контактні дані",
    hours: "Пн–Пт: 9:00–17:00",
    disclaimer: "Це повідомлення було надіслано автоматично як підтвердження отримання заявки. Будь ласка, не відповідайте на цей лист — наш консультант зв'яжеться з Вами безпосередньо.",
    subject: "Підтвердження заявки — Polskie Centrum Wizowe",
  },
};

function buildConfirmationHtml({ formType, name, lang, logoUrl, siteUrl }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pl;
  const greeting = name ? t.greetingNamed(name) : t.greetingAnon;
  const formLabel = t.formLabel[formType] || t.formLabel.general;

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Potwierdzenie zgłoszenia — Polskie Centrum Wizowe</title>
</head>
<body style="margin:0;padding:0;background:#f1f0ee;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f0ee;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:${NAVY};padding:28px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <img src="${logoUrl}" alt="Polskie Centrum Wizowe" height="36" style="display:block;height:36px;" />
                  </td>
                  <td align="right">
                    <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(225,233,243,0.5);">${t.badge}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Red accent line -->
          <tr>
            <td style="background:${RED};height:3px;line-height:3px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="background:#ffffff;padding:36px 32px 28px;">
              <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${RED};">${t.redLabel}</p>
              <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:26px;font-weight:400;color:${NAVY};line-height:1.2;">${t.h1}</h1>
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:#374151;line-height:1.7;">${greeting}</p>
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;color:#374151;line-height:1.7;">${t.body1(formLabel)}</p>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#374151;line-height:1.7;">${t.body2}</p>
            </td>
          </tr>

          <!-- Contact info block -->
          <tr>
            <td style="background:#ffffff;padding:0 32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${CREAM};border:1px solid ${BORDER};">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${GREY};">${t.contactHeader}</p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:8px;">
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${GREY};display:inline-block;width:60px;">Email</span>
                          <a href="mailto:kontakt@pcw.pl" style="font-family:Arial,sans-serif;font-size:13px;color:${NAVY};text-decoration:none;font-weight:600;">kontakt@pcw.pl</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:8px;">
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${GREY};display:inline-block;width:60px;">Telefon</span>
                          <a href="tel:+48221234567" style="font-family:Arial,sans-serif;font-size:13px;color:${NAVY};text-decoration:none;font-weight:600;">+48 22 123 45 67</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:8px;">
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${GREY};display:inline-block;width:60px;">Adres</span>
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${NAVY};font-weight:600;">ul. Górnośląska 6 lok. 1, 00-444 Warszawa</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${GREY};display:inline-block;width:60px;">Godziny</span>
                          <span style="font-family:Arial,sans-serif;font-size:13px;color:${NAVY};font-weight:600;">${t.hours}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${CREAM};padding:24px 32px;border-top:1px solid ${BORDER};">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:13px;font-weight:600;color:${NAVY};">Polskie Centrum Wizowe</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:${GREY};">
                      <a href="${siteUrl}" style="color:${GREY};text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Disclaimer -->
          <tr>
            <td style="padding:16px 32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">
                ${t.disclaimer}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function getConfirmationSubject(lang) {
  return (TRANSLATIONS[lang] || TRANSLATIONS.pl).subject;
}

module.exports = { buildConfirmationHtml, getConfirmationSubject };
