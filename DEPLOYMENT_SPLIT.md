# Rozdzielony deployment CyberFolks

## Architektura

- UI: statyczny eksport Next.js (`next.config.ts` ma `output: "export"`), upload zawartości `out/` do `public_html`.
- API: osobna aplikacja Node.js `mail-api` na subdomenie API, uruchamiana wyłącznie przez Passenger w DirectAdmin.

UI nie używa `next start`, PM2 ani ręcznie uruchamianego `node`. Dzięki temu zwykłe wejścia na stronę obsługuje Apache/statyczne pliki, a limit `nproc` nie rośnie od ruchu na stronie.

## Workflowy GitHub Actions

- `.github/workflows/deploy-ui.yml`
  - uruchamia się przy pushu na `master`, z pominięciem zmian tylko w `mail-api/**` i dokumentacji,
  - robi `npm ci`, `npm run build`,
  - uploaduje tylko `out/*` do `FRONTEND_PATH`,
  - nie dotyka API i nie restartuje Passenger.

- `.github/workflows/deploy-api.yml`
  - uruchamia się tylko przy zmianach w `mail-api/**` albo ręcznie,
  - uploaduje `mail-api/*` do `API_PATH/_incoming`,
  - na serwerze zachowuje `.env`, `node_modules` i `tmp`,
  - uruchamia `npm ci --omit=dev` tylko gdy zmienił się `package-lock.json`,
  - restartuje Passenger przez `touch tmp/restart.txt`.

## GitHub Secrets

W GitHub -> repozytorium -> Settings -> Secrets and variables -> Actions ustaw:

```env
SSH_HOST=sXXX.cyber-folks.pl
SSH_PORT=22
SSH_USER=twoj_login_ssh
SSH_PRIVATE_KEY=<prywatny klucz deploy>

FRONTEND_PATH=/home/twoj_login/domains/centrum-wizowe.pl/public_html
API_PATH=/home/twoj_login/domains/centrum-wizowe.pl/public_html/api.centrum-wizowe.pl/mail-api
NEXT_PUBLIC_API_URL=https://api.centrum-wizowe.pl
```

`NEXT_PUBLIC_API_URL` nie może mieć slash na końcu.

## Sekrety na serwerze API

Tych wartości nie trzymaj w GitHub Secrets. Utwórz je na hostingu w:

```text
/home/twoj_login/domains/centrum-wizowe.pl/public_html/api.centrum-wizowe.pl/mail-api/.env
```

Minimalny plik:

```env
SMTP_HOST=s59.cyber-folks.pl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=office@centrum-wizowe.pl
SMTP_PASS=TWOJE_HASLO_DO_SKRZYNKI

SMTP_FROM="Polskie Centrum Wizowe" <office@centrum-wizowe.pl>
CONTACT_EMAIL_TO=office@centrum-wizowe.pl

CORS_ORIGIN=https://www.centrum-wizowe.pl,https://centrum-wizowe.pl,http://localhost:3000
SITE_URL=https://www.centrum-wizowe.pl
LOGO_URL=https://www.centrum-wizowe.pl/logo-footer.svg

NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

Port SMTP: użyj `465` z `SMTP_SECURE=true` dla SSL albo `587` z `SMTP_SECURE=false` dla STARTTLS.

Nie ustawiaj `PORT` na produkcji, jeśli Passenger sam go wstrzykuje. Jeśli panel CyberFolks wymaga podania portu, użyj wartości wskazanej przez panel, nie odpalaj ręcznie `node index.js`.

Po utworzeniu pliku:

```bash
chmod 600 /home/twoj_login/domains/centrum-wizowe.pl/public_html/api.centrum-wizowe.pl/mail-api/.env
```

## Konfiguracja DirectAdmin Node.js

Dla subdomeny API ustaw jedną aplikację Node.js:

- Application root: `/home/twoj_login/domains/centrum-wizowe.pl/public_html/api.centrum-wizowe.pl/mail-api`
- Application URL: `api.centrum-wizowe.pl`
- Startup file: `index.js`
- Environment: `production`

Nie twórz aplikacji Node.js dla domeny głównej `centrum-wizowe.pl`.

## Kontrola `nproc`

Na hostingu współdzielonym unikaj:

- `node index.js` uruchamianego ręcznie przez SSH,
- PM2,
- `next start`,
- kilku aplikacji Node.js wskazujących na ten sam katalog API.

Sprawdzenie procesów:

```bash
ps -u "$USER" -o pid,ppid,stat,comm,args | grep -E 'node|Passenger' | grep -v grep
```

Poprawny stan: procesy Node są związane z jedną aplikacją Passenger API. UI nie powinien generować procesów Node.
