# Instrukcja deploymentu - CyberFolks cyber_SPRINT

Ten plik opisuje pelna konfiguracje deploymentu projektu Polskie Centrum Wizowe na CyberFolks.

Docelowo:

```text
polskiecentrumwizowe.pl
  -> statyczny frontend Next.js z folderu out/
  -> bez procesu Node.js, bez Passenger

api.polskiecentrumwizowe.pl
  -> mail-api, lekki Express API
  -> jeden proces Node.js przez Passenger

GitHub Actions
  -> buduje frontend
  -> kopiuje out/ na hosting
  -> kopiuje mail-api/ na hosting
  -> instaluje zaleznosci API tylko gdy zmieni sie package-lock.json
  -> restartuje API przez tmp/restart.txt
```

To jest wazne dla cyber_SPRINT: frontend nie moze dzialac jako `next start` na Passengerze. Frontend ma byc tylko plikami statycznymi. Passenger ma obslugiwac tylko male API do wysylki maili.

## 1. Pliki w repozytorium

Najwazniejsze pliki:

```text
.github/workflows/deploy.yml       - automatyczny deploy z GitHub Actions
.env.production.example            - lista wszystkich wartosci do GitHub Secrets i .env API
next.config.ts                      - ustawione output: "export"
mail-api/index.js                   - aplikacja Express dla formularzy
mail-api/package.json               - zaleznosci API
mail-api/.env.example               - lokalny przyklad .env dla API
```

Nie commituj prawdziwych hasel ani kluczy.

## 2. Co musisz przygotowac

Potrzebujesz:

```text
1. Dostep do panelu CyberFolks / DirectAdmin.
2. Dostep SSH do hostingu.
3. Domene glowna, np. polskiecentrumwizowe.pl.
4. Subdomene API, np. api.polskiecentrumwizowe.pl.
5. Konto e-mail, np. biuro@polskiecentrumwizowe.pl.
6. Repozytorium na GitHubie z wlaczonym GitHub Actions.
```

## 3. Konfiguracja domeny glownej

Domena glowna ma serwowac tylko pliki statyczne.

W CyberFolks / DirectAdmin upewnij sie, ze domena istnieje:

```text
polskiecentrumwizowe.pl
```

Typowy katalog domeny glownej:

```text
/home/TWOJ_LOGIN/domains/polskiecentrumwizowe.pl/public_html
```

Ten katalog bedzie wartoscia GitHub Secret:

```text
FRONTEND_PATH=/home/TWOJ_LOGIN/domains/polskiecentrumwizowe.pl/public_html
```

Jak znalezc poprawna sciezke:

```bash
pwd
ls -la ~/domains
ls -la ~/domains/polskiecentrumwizowe.pl/public_html
```

Jezeli domena nazywa sie inaczej, podmien nazwe domeny w sciezce.

## 4. Konfiguracja subdomeny API

W DirectAdmin utworz subdomene:

```text
api.polskiecentrumwizowe.pl
```

Docelowy katalog aplikacji API:

```text
/home/TWOJ_LOGIN/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

To bedzie wartoscia GitHub Secret:

```text
API_PATH=/home/TWOJ_LOGIN/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

`API_PATH` musi wskazywac bezposrednio katalog aplikacji Node.js, czyli katalog z `index.js` i `package.json`. Nie ustawiaj tu katalogu calego repozytorium.

Przez SSH utworz katalog, jezeli jeszcze nie istnieje:

```bash
mkdir -p ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

## 5. Konfiguracja aplikacji Node.js w DirectAdmin

W panelu CyberFolks / DirectAdmin wejdz w:

```text
Aplikacje Node.js
```

Utworz nowa aplikacje:

```text
Node.js version: 20.x
Application root: /home/TWOJ_LOGIN/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
Application URL: api.polskiecentrumwizowe.pl
Startup file: index.js
NODE_ENV: production
```

Znaczenie pol:

```text
Node.js version
  Wersja Node.js uzywana przez Passenger. Ustaw 20.x, bo projekt jest budowany i testowany na Node 20.

Application root
  Katalog aplikacji API. To musi byc ten sam katalog co API_PATH w GitHub Secrets.

Application URL
  Subdomena, pod ktora bedzie dzialac API.

Startup file
  Plik startowy Express API. W tym projekcie to index.js.

NODE_ENV
  Tryb produkcyjny. Ustaw production.
```

Po utworzeniu aplikacji nie musisz wrzucac tam calego repozytorium. GitHub Actions wrzuci tylko katalog `mail-api`.

## 6. Konto e-mail i SMTP

W CyberFolks utworz konto e-mail, np.:

```text
biuro@polskiecentrumwizowe.pl
```

Z panelu poczty lub konfiguracji klienta pocztowego odczytaj:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
SMTP_SECURE
```

Typowa konfiguracja dla poczty w domenie:

```text
SMTP_HOST=mail.polskiecentrumwizowe.pl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=biuro@polskiecentrumwizowe.pl
SMTP_PASS=haslo_do_skrzynki
```

Jezeli CyberFolks poda port 587:

```text
SMTP_PORT=587
SMTP_SECURE=false
```

Nie dodawaj hasla SMTP do GitHub Secrets. Haslo SMTP trzymamy tylko na serwerze w pliku:

```text
mail-api/.env
```

## 7. Klucz SSH dla GitHub Actions

GitHub Actions musi miec mozliwosc polaczenia sie przez SSH z CyberFolks.

Na swoim komputerze wygeneruj osobny klucz do deploymentu:

```bash
ssh-keygen -t ed25519 -C "github-deploy-pcw" -f ~/.ssh/pcw_deploy
```

Powstana dwa pliki:

```text
~/.ssh/pcw_deploy      - klucz prywatny, trafia do GitHub Secret SSH_PRIVATE_KEY
~/.ssh/pcw_deploy.pub  - klucz publiczny, trafia na hosting do authorized_keys
```

Klucz publiczny dodaj na CyberFolks:

```bash
ssh TWOJ_LOGIN@sXXX.cyber-folks.pl
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

Do `authorized_keys` wklej zawartosc:

```bash
cat ~/.ssh/pcw_deploy.pub
```

Po wklejeniu ustaw uprawnienia:

```bash
chmod 600 ~/.ssh/authorized_keys
```

Przetestuj polaczenie z komputera:

```bash
ssh -i ~/.ssh/pcw_deploy TWOJ_LOGIN@sXXX.cyber-folks.pl
```

Jezeli logowanie dziala bez hasla, klucz jest poprawnie skonfigurowany.

## 8. GitHub Secrets - pelna lista

Wejdz w GitHub:

```text
Repozytorium -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Dodaj dokladnie te secrety.

### SSH_HOST

Przyklad:

```text
SSH_HOST=sXXX.cyber-folks.pl
```

Co to jest:

```text
Adres serwera SSH CyberFolks.
```

Skad go wziac:

```text
Z panelu CyberFolks, danych konta hostingowego, informacji o SSH/FTP albo maila aktywacyjnego hostingu.
```

Jak sprawdzic:

```bash
ssh TWOJ_LOGIN@sXXX.cyber-folks.pl
```

### SSH_PORT

Przyklad:

```text
SSH_PORT=22
```

Co to jest:

```text
Port SSH.
```

Skad go wziac:

```text
Z panelu CyberFolks. Najczesciej jest to 22.
```

### SSH_USER

Przyklad:

```text
SSH_USER=twoj_login
```

Co to jest:

```text
Login SSH do hostingu.
```

Skad go wziac:

```text
Z panelu CyberFolks / DirectAdmin albo maila aktywacyjnego. To zwykle login konta hostingowego.
```

Jak sprawdzic:

```bash
ssh SSH_USER@SSH_HOST
```

### SSH_PRIVATE_KEY

Przyklad:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

Co to jest:

```text
Prywatny klucz SSH, ktory GitHub Actions wykorzysta do polaczenia z hostingiem.
```

Skad go wziac:

```bash
cat ~/.ssh/pcw_deploy
```

Wklej cala zawartosc pliku, razem z liniami BEGIN i END.

Wazne:

```text
Nie wklejaj tutaj .pub. Plik .pub to klucz publiczny i ma byc tylko na hostingu w authorized_keys.
```

### FRONTEND_PATH

Przyklad:

```text
FRONTEND_PATH=/home/twoj_login/domains/polskiecentrumwizowe.pl/public_html
```

Co to jest:

```text
Katalog domeny glownej, do ktorego GitHub Actions wgra zawartosc folderu out/.
```

Skad go wziac:

```bash
ssh TWOJ_LOGIN@sXXX.cyber-folks.pl
pwd
ls -la ~/domains
ls -la ~/domains/polskiecentrumwizowe.pl/public_html
```

Uwaga:

```text
Workflow uzywa rm: true dla uploadu frontendu, wiec zawartosc tego katalogu bedzie nadpisywana plikami z out/.
Nie ustawiaj FRONTEND_PATH na zbyt wysoki katalog, np. /home/twoj_login albo ~/domains.
```

### API_PATH

Przyklad:

```text
API_PATH=/home/twoj_login/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

Co to jest:

```text
Katalog aplikacji Node.js API na hostingu.
```

Skad go wziac:

```bash
ssh TWOJ_LOGIN@sXXX.cyber-folks.pl
mkdir -p ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
cd ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
pwd
```

Wynik `pwd` wklej jako `API_PATH`.

Uwaga:

```text
To musi byc ten sam katalog co Application root w DirectAdmin.
```

### NEXT_PUBLIC_API_URL

Przyklad:

```text
NEXT_PUBLIC_API_URL=https://api.polskiecentrumwizowe.pl
```

Co to jest:

```text
Publiczny adres API, ktory zostanie wbudowany do statycznego frontendu podczas npm run build.
```

Skad go wziac:

```text
To adres subdomeny API po wlaczeniu SSL.
```

Uwaga:

```text
Nie dodawaj ukosnika na koncu.
Dobrze: https://api.polskiecentrumwizowe.pl
Zle:    https://api.polskiecentrumwizowe.pl/
```

## 9. Plik .env API na CyberFolks

Na hostingu utworz plik:

```bash
nano ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/.env
```

Wklej:

```env
SMTP_HOST=mail.polskiecentrumwizowe.pl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=biuro@polskiecentrumwizowe.pl
SMTP_PASS=TWOJE_HASLO_DO_SKRZYNKI

SMTP_FROM="Polskie Centrum Wizowe" <biuro@polskiecentrumwizowe.pl>
CONTACT_EMAIL_TO=biuro@polskiecentrumwizowe.pl

CORS_ORIGIN=https://polskiecentrumwizowe.pl

SITE_URL=https://polskiecentrumwizowe.pl
LOGO_URL=https://polskiecentrumwizowe.pl/logo-footer.svg

PORT=3000
NODE_ENV=production

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

Znaczenie zmiennych:

```text
SMTP_HOST
  Serwer SMTP poczty. Zwykle mail.twojadomena.pl albo host podany przez CyberFolks.

SMTP_PORT
  Port SMTP. Zwykle 465 dla SSL albo 587 dla STARTTLS.

SMTP_SECURE
  true dla portu 465, false dla portu 587.

SMTP_USER
  Login do skrzynki e-mail. Zwykle pelny adres e-mail.

SMTP_PASS
  Haslo do skrzynki e-mail.

SMTP_FROM
  Nadawca widoczny w mailach.

CONTACT_EMAIL_TO
  Adres, na ktory maja trafiac zgloszenia z formularzy.

CORS_ORIGIN
  Domena frontendu, ktora moze wysylac requesty do API.

SITE_URL
  Publiczny adres strony glownej, uzywany w szablonach e-mail.

LOGO_URL
  Publiczny adres logo w mailach.

PORT
  Fallback lokalny. Passenger czesto ustawia port sam, ale zmienna moze zostac.

NODE_ENV
  production dla srodowiska produkcyjnego.

RATE_LIMIT_WINDOW_MS
  Okno limitu requestow. 900000 ms = 15 minut.

RATE_LIMIT_MAX_REQUESTS
  Maksymalna liczba zgloszen z jednego IP w oknie czasowym.
```

Po zapisaniu sprawdz uprawnienia:

```bash
chmod 600 ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/.env
```

## 10. Pierwszy deploy

Po skonfigurowaniu GitHub Secrets i `.env` na serwerze zrob push do brancha `master`:

```bash
git push origin master
```

Albo uruchom recznie:

```text
GitHub -> Actions -> Deploy to CyberFolks -> Run workflow
```

Workflow wykona:

```text
1. npm ci
2. npm run build
3. upload out/* do FRONTEND_PATH
4. upload mail-api/* do API_PATH/_incoming
5. podmiane plikow API na serwerze
6. npm ci --omit=dev, jezeli zmienily sie zaleznosci API
7. touch tmp/restart.txt
```

## 11. Test po deployu

Sprawdz API:

```bash
curl https://api.polskiecentrumwizowe.pl/health
```

Oczekiwany wynik:

```json
{"status":"ok"}
```

Sprawdz frontend:

```text
https://polskiecentrumwizowe.pl
```

Sprawdz formularz:

```text
1. Wejdz na strone konsultacji.
2. Wyslij testowe zgloszenie.
3. Sprawdz skrzynke CONTACT_EMAIL_TO.
4. Sprawdz, czy klient dostal mail potwierdzajacy.
```

## 12. Reczny restart API

Jezeli API wymaga restartu:

```bash
touch ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/tmp/restart.txt
```

Albo w panelu:

```text
DirectAdmin -> Aplikacje Node.js -> Restart
```

## 13. Logi i diagnostyka

Typowe komendy:

```bash
tail -f ~/logs/passenger.log
tail -f ~/domains/api.polskiecentrumwizowe.pl/logs/error_log
tail -f ~/domains/api.polskiecentrumwizowe.pl/logs/access_log
```

Sprawdzenie plikow API:

```bash
ls -la ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

Powinny byc widoczne m.in.:

```text
.env
index.js
package.json
package-lock.json
node_modules/
templates/
tmp/
```

Sprawdzenie procesu Node:

```bash
ps aux | grep node
```

Na hostingu wspoldzielonym nie uruchamiaj recznie wielu procesow `node index.js`. Aplikacja ma dzialac przez Passenger.

## 14. Najczestsze problemy

### GitHub Actions: Missing NEXT_PUBLIC_API_URL secret

Brakuje secretu:

```text
NEXT_PUBLIC_API_URL=https://api.polskiecentrumwizowe.pl
```

Dodaj go w GitHub Secrets i uruchom workflow ponownie.

### GitHub Actions: permission denied przy SSH

Sprawdz:

```text
1. Czy SSH_PRIVATE_KEY zawiera klucz prywatny, nie publiczny.
2. Czy klucz publiczny jest w ~/.ssh/authorized_keys na CyberFolks.
3. Czy SSH_USER i SSH_HOST sa poprawne.
4. Czy port SSH to faktycznie 22.
5. Czy authorized_keys ma chmod 600, a katalog .ssh chmod 700.
```

### API nie startuje, bo brakuje .env

Workflow zatrzyma deploy, jezeli w `API_PATH` nie ma `.env`.

Utworz:

```bash
nano ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/.env
```

### API zwraca blad CORS

W `.env` API ustaw:

```text
CORS_ORIGIN=https://polskiecentrumwizowe.pl
```

Bez ukosnika na koncu.

### Formularz wysyla request do undefined/contact

Frontend zostal zbudowany bez `NEXT_PUBLIC_API_URL`.

Popraw GitHub Secret:

```text
NEXT_PUBLIC_API_URL=https://api.polskiecentrumwizowe.pl
```

Potem uruchom deploy ponownie.

### Mail nie wychodzi

Sprawdz w `.env`:

```text
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
SMTP_FROM
CONTACT_EMAIL_TO
```

Najczestsze bledy:

```text
1. Zly port albo SMTP_SECURE.
2. Haslo do panelu zamiast hasla do skrzynki.
3. SMTP_USER bez pelnego adresu e-mail.
4. Konto e-mail jeszcze nie istnieje.
```

### Limit procesow Passenger

W tym deploymentcie frontend nie uzywa Passenger. Jezeli licznik procesow znow zacznie rosnac, sprawdz:

```text
1. Czy domena glowna nie jest skonfigurowana jako aplikacja Node.js.
2. Czy nigdzie nie uruchomiono next start.
3. Czy przez SSH nie zostaly odpalone reczne procesy node index.js.
4. Czy DirectAdmin ma tylko jedna aplikacje Node.js dla api.polskiecentrumwizowe.pl.
```

## 15. Finalna checklista

Przed pierwszym deployem:

```text
[ ] Domena glowna istnieje w DirectAdmin.
[ ] Subdomena api.polskiecentrumwizowe.pl istnieje w DirectAdmin.
[ ] Aplikacja Node.js jest ustawiona tylko dla API.
[ ] Application root = API_PATH.
[ ] Startup file = index.js.
[ ] NODE_ENV = production.
[ ] Konto e-mail biuro@polskiecentrumwizowe.pl istnieje.
[ ] SMTP dziala i masz haslo do skrzynki.
[ ] Klucz publiczny SSH jest w authorized_keys.
[ ] GitHub Secret SSH_PRIVATE_KEY zawiera klucz prywatny.
[ ] GitHub Secrets maja SSH_HOST, SSH_PORT, SSH_USER, SSH_PRIVATE_KEY.
[ ] GitHub Secrets maja FRONTEND_PATH, API_PATH, NEXT_PUBLIC_API_URL.
[ ] Plik mail-api/.env istnieje na serwerze.
[ ] Pierwszy deploy w GitHub Actions przechodzi bez bledu.
[ ] /health zwraca {"status":"ok"}.
[ ] Formularz wysyla mail do biura.
```
