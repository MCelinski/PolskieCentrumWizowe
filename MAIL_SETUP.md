# Mail API — Dokumentacja implementacji

Integracja wysyłania maili z formularzy kontaktowych PCW.  
Architektura: **Next.js static export** (Apache) + **Express mail-api** (Node.js / Passenger).

---

## Spis treści

1. [Architektura](#architektura)
2. [Analiza formularzy](#analiza-formularzy)
3. [Struktura plików](#struktura-plików)
4. [Zmienne środowiskowe](#zmienne-środowiskowe)
5. [Testowanie lokalne](#testowanie-lokalne)
6. [Wygląd maila](#wygląd-maila)
7. [Wdrożenie na Cyberfolks](#wdrożenie-na-cyberfolks)
8. [Zmiana ustawień po wdrożeniu](#zmiana-ustawień-po-wdrożeniu)

---

## Architektura

```
Cyberfolks hosting
├── public_html/                ← statyczny Next.js build (/out)
│   └── (serwowany przez Apache — zero Node.js przy wizytach)
│
└── mail-api/                   ← Express.js app (Node.js via Passenger)
    └── (subdomena: api.twojadomena.pl)
        └── POST /contact       ← endpoint odbierający oba formularze
```

**Dlaczego tak, a nie inaczej:**
- Cyberfolks Sprint = PHP/Apache + opcjonalny Node.js przez Passenger
- Static export = Apache serwuje zwykłe pliki → zero obciążenia Node.js przy odwiedzinach
- Express z 1 endpointem = prosty proces, Passenger go nie mnoży (problem był z Next.js server mode)
- Jeden endpoint obsługuje oba formularze (pole `formType` rozróżnia)

---

## Analiza formularzy

### Form 1 — GeneralConsultationForm

Plik: `components/forms/GeneralConsultationForm.tsx`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `name` | text | TAK | Imię i nazwisko |
| `email` | email | TAK | Adres e-mail klienta |
| `phone` | tel | NIE | Numer telefonu |
| `message` | textarea | TAK | Treść wiadomości |

**Status**: Gotowy. Ma pole email — możemy odpisać klientowi.

---

### Form 2 — VisaQualificationForm

Plik: `components/forms/VisaQualificationForm.tsx`

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `citizenship` | text | TAK | Obywatelstwo |
| `purpose` | select | TAK | Cel pobytu w Polsce |
| `duration` | select | TAK | Planowany czas pobytu |
| `job_offer` | radio (tak/nie) | TAK | Czy ma ofertę pracy |
| `family_in_poland` | radio (tak/nie) | TAK | Czy ma rodzinę w Polsce |
| ~~`email`~~ | — | — | **BRAK — wymaga dodania** |

> **Wymagana zmiana przed implementacją:**  
> VisaQualificationForm nie ma pola email. Bez niego nie możemy odpisać klientowi.  
> Podczas implementacji dodamy pole `email` (wymagane) do tego formularza.

---

## Struktura plików

Po implementacji projekt będzie wyglądał tak:

```
PolskieCentrumWizowe/
│
├── mail-api/                        ← NOWY katalog (osobna aplikacja Node.js)
│   ├── index.js                     ← główny serwer Express
│   ├── package.json                 ← zależności Express app
│   ├── .env.example                 ← szablon zmiennych (commitowany)
│   ├── .env                         ← prawdziwe wartości (NIE commitować!)
│   └── templates/
│       └── email.js                 ← funkcja generująca HTML maila
│
├── components/forms/
│   ├── GeneralConsultationForm.tsx  ← zmiana: mock → fetch do API
│   └── VisaQualificationForm.tsx    ← zmiana: mock → fetch + dodanie pola email
│
├── .env.local                       ← zmiana: NEXT_PUBLIC_API_URL=localhost:3001
├── .env.production                  ← zmiana: NEXT_PUBLIC_API_URL=https://api.domena.pl
├── next.config.ts                   ← zmiana: output: 'export'
├── .gitignore                       ← zmiana: dodać mail-api/.env
│
└── out/                             ← generowany przez `npm run build` (FTP → public_html)
```

---

## Zmienne środowiskowe

### Next.js (frontend)

Plik `.env.local` (lokalne testowanie):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Plik `.env.production` (build produkcyjny):
```
NEXT_PUBLIC_API_URL=https://api.twojadomena.pl
```

> `NEXT_PUBLIC_` — zmienna jest wbudowywana w HTML na etapie `npm run build`.  
> Zmiana URL API wymaga przebudowania Next.js i ponownego uploadu `/out`.

---

### Express mail-api

Plik `mail-api/.env` (jeden plik, wartości różne dla dev/prod):

| Zmienna | Wartość lokalna (Ethereal) | Wartość produkcyjna (Cyberfolks) |
|---------|--------------------------|----------------------------------|
| `SMTP_HOST` | `smtp.ethereal.email` | np. `mail.cyberfolks.pl` *(z panelu)* |
| `SMTP_PORT` | `587` | `587` lub `465` *(z panelu)* |
| `SMTP_SECURE` | `false` | `false` (587) lub `true` (465) |
| `SMTP_USER` | *(wygenerowany przez Ethereal)* | `biuro@twojadomena.pl` |
| `SMTP_PASS` | *(wygenerowany przez Ethereal)* | *(hasło z panelu Cyberfolks)* |
| `SMTP_FROM` | `"PCW Test" <test@ethereal.email>` | `"Polskie Centrum Wizowe" <biuro@twojadomena.pl>` |
| `CONTACT_EMAIL_TO` | *(Ethereal inbox, wygenerowany)* | `biuro@twojadomena.pl` |
| `CORS_ORIGIN` | `http://localhost:3000` | `https://twojadomena.pl` |
| `PORT` | `3001` | `3001` *(lub przydzielony przez Cyberfolks)* |
| `NODE_ENV` | `development` | `production` |
| `LOGO_URL` | `http://localhost:3000/logo-dark.svg` | `https://twojadomena.pl/logo-dark.svg` |
| `SITE_URL` | `http://localhost:3000` | `https://twojadomena.pl` |

> **Bezpieczeństwo:**  
> - `mail-api/.env` jest w `.gitignore` — nigdy nie trafia do repozytorium  
> - `mail-api/.env.example` jest commitowany (bez wartości) jako wzorzec  
> - Zmiana ustawień po wdrożeniu = edycja pliku `.env` na serwerze + restart aplikacji

---

## Testowanie lokalne

### Krok 1 — Wygenerowanie konta Ethereal (jednorazowe)

```powershell
cd mail-api
node -e "const nm = require('nodemailer'); nm.createTestAccount().then(a => { console.log('SMTP_USER=' + a.user); console.log('SMTP_PASS=' + a.pass); console.log('Inbox: https://ethereal.email/login'); console.log('Login:', a.user, a.pass); })"
```

Skopiować `SMTP_USER` i `SMTP_PASS` do `mail-api/.env`.  
Skrzynka odbiorcza na `https://ethereal.email` — maile z formularzy trafiają tam.

### Krok 2 — Uruchomienie mail-api

```powershell
cd mail-api
npm install
node index.js
# → Mail API listening on port 3001
```

### Krok 3 — Uruchomienie Next.js (osobny terminal)

```powershell
npm run dev
# → http://localhost:3000
```

### Krok 4 — Test formularzy

1. Otwórz `http://localhost:3000/konsultacje`
2. Wypełnij i wyślij formularz
3. Sprawdź `https://ethereal.email` — powinien być mail z danymi

### Krok 5 — Test budowania statycznego

```powershell
npm run build
# → sprawdź czy folder /out powstał bez błędów
```

---

## Wygląd maila

### Projekt HTML

Mail będzie w formacie HTML zgodnym z klientami pocztowymi (Gmail, Outlook, Apple Mail).  
Użyjemy inline styles (standard dla emaili).

**Paleta kolorów:**
- Tło nagłówka: `#041c2d` (navy, brand color)
- Akcent: `#c42021` (czerwony, brand color)
- Tło body: `#ffffff`
- Tło sekcji danych: `#f8f7f4` (cream)
- Tekst główny: `#041c2d`
- Tekst pomocniczy: `#6b7280`

**Logo:**  
- Plik: `public/logo-light.svg` (wersja jasna — na ciemnym tle nagłówka)
- W emailu: tag `<img>` z URL do hostowanego pliku (`LOGO_URL` z `.env`)
- Lokalnie: `http://localhost:3000/logo-light.svg`
- Produkcja: `https://twojadomena.pl/logo-light.svg`

**Układ maila:**

```
┌─────────────────────────────────────────┐
│  [logo PCW na tle #041c2d]              │  nagłówek navy
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Nowe zgłoszenie z formularza           │  tytuł
│  Konsultacja ogólna / Kwalifikacja wizy │  podtytuł (typ formularza)
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ IMIĘ I NAZWISKO                 │   │  sekcja danych
│  │ Jan Kowalski                    │   │  tło #f8f7f4
│  ├─────────────────────────────────┤   │
│  │ ADRES E-MAIL                    │   │
│  │ jan@example.com                 │   │
│  ├─────────────────────────────────┤   │
│  │ TELEFON                         │   │
│  │ +48 600 000 000                 │   │
│  ├─────────────────────────────────┤   │
│  │ WIADOMOŚĆ                       │   │
│  │ Treść wiadomości klienta...     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Odpowiedz na wiadomość]               │  przycisk CTA (link mailto:)
│                                         │
├─────────────────────────────────────────┤
│  Polskie Centrum Wizowe                 │  stopka
│  biuro@twojadomena.pl                   │
│  twojadomena.pl                         │
│  ─────────────────────────────────────  │
│  Ta wiadomość została wysłana           │  disclaimer
│  automatycznie z formularza na stronie. │
└─────────────────────────────────────────┘
```

**Pola w mailu zależnie od formularza:**

*GeneralConsultationForm:* Imię, Email, Telefon, Wiadomość  
*VisaQualificationForm:* Email, Obywatelstwo, Cel pobytu, Czas pobytu, Oferta pracy, Rodzina w Polsce

---

## Wdrożenie na Cyberfolks

> Wykonać dopiero gdy masz dostęp do hostingu.

### Krok 1 — Pobranie danych SMTP z Cyberfolks

1. Zaloguj się do panelu DirectAdmin/cPanel
2. Sekcja **Email Accounts** → stwórz konto `biuro@twojadomena.pl`
3. Wejdź w **Configure email client** → zapisz:
   - SMTP Host (np. `mail.cyberfolks.pl`)
   - SMTP Port (zwykle `587`)
   - Username (pełny adres email)
   - Password

### Krok 2 — Aktualizacja `mail-api/.env` dla produkcji

Zmień wartości w pliku `.env` zgodnie z tabelą zmiennych środowiskowych.  
Kluczowe zmiany: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CORS_ORIGIN`, `NODE_ENV`.

### Krok 3 — Test SMTP Cyberfolks lokalnie (opcjonalny ale zalecany)

Przed uploadem sprawdź że Cyberfolks SMTP działa z lokalnego komputera:

```powershell
node index.js
# wyślij testowy formularz → sprawdź skrzynkę biuro@twojadomena.pl
```

> Uwaga: Niektóre sieci WiFi blokują port 587. Jeśli nie działa, spróbuj z hotspotu mobilnego.

### Krok 4 — Build Next.js dla produkcji

Uzupełnij `.env.production` o docelowy URL API, następnie:

```powershell
npm run build
# → folder /out gotowy do uploadu FTP
```

### Krok 5 — Upload przez FTP/SFTP

| Co uploadować | Skąd | Dokąd na serwerze |
|--------------|------|-------------------|
| Zawartość `/out/` | lokalnie `/out/*` | `public_html/` |
| Folder `mail-api/` | lokalnie `/mail-api/` | `/home/login/mail-api/` (bez `node_modules/`) |
| Plik `.env` | lokalnie `mail-api/.env` | `/home/login/mail-api/.env` |

> Nie uploaduj `node_modules/` — zostaną zainstalowane na serwerze przez `npm install`.

### Krok 6 — Konfiguracja Node.js w DirectAdmin

1. DirectAdmin → **Pozostałe ustawienia** → **Aplikacje Node.js**
2. **Create Application**:
   - Node.js version: `20.x` lub nowsza
   - Application root: `/home/login/mail-api`
   - Application URL: `api.twojadomena.pl`
   - Startup file: `index.js`
   - NODE_ENV: `production`
3. Zapisz → pojawi się przycisk **Enter to virtual environment**

### Krok 7 — Instalacja zależności przez SSH

```bash
# W virtual environment (link w panelu DirectAdmin)
cd /home/login/mail-api
npm install --omit=dev
```

### Krok 8 — Test produkcyjny

1. Otwórz `https://twojadomena.pl/konsultacje`
2. Wyślij formularz
3. Sprawdź skrzynkę `biuro@twojadomena.pl`

---

## Zmiana ustawień po wdrożeniu

### Zmiana adresu email odbiorcy

Plik: `mail-api/.env` na serwerze (przez FTP lub SSH)

```
CONTACT_EMAIL_TO=nowy-adres@twojadomena.pl
```

Po edycji: restart aplikacji Node.js w panelu DirectAdmin → **Restart**.

### Zmiana danych SMTP (np. nowe hasło)

Plik: `mail-api/.env` na serwerze

```
SMTP_PASS=nowe-haslo
```

Po edycji: restart aplikacji.

### Zmiana URL strony / API

1. Zmień `NEXT_PUBLIC_API_URL` w `.env.production` (lokalnie)
2. Przebuduj: `npm run build`
3. Uploaduj nowy `/out/` przez FTP

### Dodanie drugiego adresu odbiorcy

W `mail-api/index.js` zmień:
```js
to: process.env.CONTACT_EMAIL_TO
// na:
to: [process.env.CONTACT_EMAIL_TO, process.env.CONTACT_EMAIL_CC].filter(Boolean).join(', ')
```

I dodaj do `.env`:
```
CONTACT_EMAIL_CC=drugi@twojadomena.pl
```

---

## Checklist implementacji

### Lokalne (bez hostingu)

- [ ] `next.config.ts` — dodać `output: 'export'`
- [ ] `npm run build` — sprawdzić że `/out` powstaje bez błędów
- [ ] `.env.local` — dodać `NEXT_PUBLIC_API_URL=http://localhost:3001`
- [ ] `.gitignore` — dodać `mail-api/.env`
- [ ] `mail-api/package.json` — stworzyć z zależnościami
- [ ] `mail-api/index.js` — Express app, endpoint POST /contact, Zod, rate limit
- [ ] `mail-api/templates/email.js` — HTML template z logo i brandingiem
- [ ] `mail-api/.env.example` — szablon (bez haseł)
- [ ] `mail-api/.env` — lokalne wartości Ethereal
- [ ] `VisaQualificationForm.tsx` — dodać pole `email`
- [ ] `GeneralConsultationForm.tsx` — zmienić mock na fetch
- [ ] `VisaQualificationForm.tsx` — zmienić mock na fetch
- [ ] Test: Ethereal Email — sprawdzić że mail trafia

### Przed wdrożeniem (po dostępie do Cyberfolks)

- [ ] Pobrać dane SMTP z panelu Cyberfolks
- [ ] Zaktualizować `mail-api/.env` — produkcyjne wartości
- [ ] Test SMTP Cyberfolks lokalnie
- [ ] Uzupełnić `.env.production` — docelowy URL API
- [ ] `npm run build` — produkcyjny build
- [ ] Upload `/out/` → `public_html/`
- [ ] Upload `mail-api/` → serwer (bez `node_modules/`)
- [ ] Konfiguracja Node.js app w DirectAdmin
- [ ] `npm install --omit=dev` przez SSH/virtual environment
- [ ] Test produkcyjny — formularz → email w skrzynce

---

## Zależności Express app

```json
{
  "express": "^4.18",
  "nodemailer": "^6.9",
  "zod": "^3.22",
  "express-rate-limit": "^7.1",
  "cors": "^2.8",
  "dotenv": "^16.3"
}
```

Brak TypeScript w mail-api (zwykły JS) — prostsze utrzymanie i deployowanie na shared hosting.

---

*Ostatnia aktualizacja: 2026-05-22*
