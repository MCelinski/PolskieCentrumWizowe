# Konfiguracja poczty na CyberFolks

Ten plik opisuje konfiguracje poczty dla projektu Polskie Centrum Wizowe na CyberFolks.

Cel:

```text
1. Utworzyc skrzynke biuro@polskiecentrumwizowe.pl.
2. Skonfigurowac SMTP do wysylki maili z mail-api.
3. Ustawic rekordy DNS poprawiajace dostarczalnosc: MX, SPF, DKIM, DMARC.
4. Wpisac dane SMTP do mail-api/.env na hostingu.
5. Przetestowac formularze po wdrozeniu.
```

## 1. Co bedzie uzywane w projekcie

API formularzy uzywa tych zmiennych:

```env
SMTP_HOST=mail.polskiecentrumwizowe.pl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=biuro@polskiecentrumwizowe.pl
SMTP_PASS=TWOJE_HASLO_DO_SKRZYNKI

SMTP_FROM="Polskie Centrum Wizowe" <biuro@polskiecentrumwizowe.pl>
CONTACT_EMAIL_TO=biuro@polskiecentrumwizowe.pl
```

Znaczenie:

```text
SMTP_HOST
  Serwer poczty wychodzacej.

SMTP_PORT
  Port SMTP. Najczesciej 465 albo 587.

SMTP_SECURE
  true dla portu 465, false dla portu 587.

SMTP_USER
  Login do skrzynki. Zwykle pelny adres e-mail.

SMTP_PASS
  Haslo do skrzynki e-mail.

SMTP_FROM
  Nadawca maili wysylanych z formularza.

CONTACT_EMAIL_TO
  Adres, na ktory trafiaja zgloszenia klientow.
```

## 2. Utworzenie skrzynki e-mail

W CyberFolks / DirectAdmin:

```text
1. Zaloguj sie do panelu.
2. Wybierz domene polskiecentrumwizowe.pl.
3. Wejdz w sekcje poczty.
4. Wybierz Konta e-mail / Email Accounts.
5. Utworz skrzynke:
   biuro@polskiecentrumwizowe.pl
6. Ustaw mocne haslo.
7. Zapisz haslo w bezpiecznym miejscu.
```

Haslo do tej skrzynki bedzie wartoscia:

```text
SMTP_PASS
```

Nie commituj tego hasla do repozytorium.

## 3. Dane SMTP - skad je wziac

Po utworzeniu skrzynki w panelu CyberFolks znajdz opcje typu:

```text
Konfiguracja klienta poczty
Configure mail client
Ustawienia poczty
```

Zapisz:

```text
Serwer SMTP
Port SMTP
Login
Haslo
Typ szyfrowania
```

Najczestszy wariant:

```env
SMTP_HOST=mail.polskiecentrumwizowe.pl
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=biuro@polskiecentrumwizowe.pl
SMTP_PASS=haslo_do_skrzynki
```

Alternatywny wariant, jezeli panel podaje port 587:

```env
SMTP_HOST=mail.polskiecentrumwizowe.pl
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=biuro@polskiecentrumwizowe.pl
SMTP_PASS=haslo_do_skrzynki
```

Zasada:

```text
Port 465 -> SMTP_SECURE=true
Port 587 -> SMTP_SECURE=false
```

## 4. Konfiguracja DNS poczty

Jezeli domena jest utrzymywana w DNS CyberFolks, czesc rekordow moze byc ustawiona automatycznie. Mimo to trzeba je sprawdzic.

Wejdz w:

```text
DirectAdmin -> Zarzadzanie DNS / DNS Management
```

### MX

MX mowi, gdzie maja trafiać przychodzace maile dla domeny.

Typowy rekord:

```text
Typ: MX
Nazwa: polskiecentrumwizowe.pl.
Wartosc: mail.polskiecentrumwizowe.pl.
Priorytet: 10
```

Moze tez byc wariant podany przez CyberFolks, np. konkretny host pocztowy. Uzyj wartosci z panelu CyberFolks, jezeli panel podaje inna.

### A record dla mail

Subdomena `mail.polskiecentrumwizowe.pl` musi wskazywac na serwer pocztowy.

Typowy rekord:

```text
Typ: A
Nazwa: mail
Wartosc: IP serwera CyberFolks
```

IP znajdziesz w panelu hostingu albo w istniejacym rekordzie domeny.

### SPF

SPF pozwala serwerom odbiorcow sprawdzic, czy CyberFolks moze wysylac maile z domeny.

Typowy rekord TXT:

```text
Typ: TXT
Nazwa: polskiecentrumwizowe.pl.
Wartosc: v=spf1 a mx include:_spf.cyberfolks.pl ~all
```

Wazne:

```text
Domena moze miec tylko jeden rekord SPF.
Jezeli SPF juz istnieje, nie dodawaj drugiego. Trzeba polaczyc wartosci w jeden rekord.
```

Przyklad laczenia:

```text
v=spf1 a mx include:_spf.cyberfolks.pl include:inny-dostawca.pl ~all
```

Jezeli panel CyberFolks pokazuje inny zalecany include SPF, uzyj wartosci z panelu.

### DKIM

DKIM podpisuje wychodzace maile kryptograficznie. To bardzo wazne dla dostarczalnosci do Gmaila, Outlooka itd.

W CyberFolks / DirectAdmin poszukaj opcji:

```text
DKIM
Email Deliverability
Zarzadzanie poczta
Uwierzytelnianie poczty
```

Wlacz DKIM dla domeny:

```text
polskiecentrumwizowe.pl
```

Panel powinien automatycznie utworzyc rekord TXT albo pokazac rekord do dodania.

Przykladowa forma rekordu:

```text
Typ: TXT
Nazwa: default._domainkey
Wartosc: v=DKIM1; k=rsa; p=...
```

Nie przepisuj tego przykladu. DKIM musi pochodzic z panelu CyberFolks, bo zawiera unikalny klucz publiczny.

### DMARC

DMARC mowi odbiorcom, co robic z mailami, ktore nie przejda SPF/DKIM.

Na start ustaw lagodna polityke monitorujaca:

```text
Typ: TXT
Nazwa: _dmarc
Wartosc: v=DMARC1; p=none; rua=mailto:biuro@polskiecentrumwizowe.pl; adkim=s; aspf=s
```

Po kilku tygodniach, jezeli wszystko dziala poprawnie, mozna zaostrzyc polityke:

```text
v=DMARC1; p=quarantine; rua=mailto:biuro@polskiecentrumwizowe.pl; adkim=s; aspf=s
```

Na poczatku nie ustawiaj `p=reject`, dopoki nie potwierdzisz, ze SPF i DKIM dzialaja poprawnie.

## 5. Konfiguracja mail-api/.env na hostingu

Po utworzeniu skrzynki i zapisaniu danych SMTP edytuj plik na serwerze:

```bash
nano ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/.env
```

Wpisz:

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

Ustaw bezpieczne uprawnienia:

```bash
chmod 600 ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/.env
```

Po zmianie `.env` zrestartuj API:

```bash
touch ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api/tmp/restart.txt
```

Albo:

```text
DirectAdmin -> Aplikacje Node.js -> Restart
```

## 6. Test poczty przez webmail

Najpierw sprawdz sama skrzynke:

```text
1. Zaloguj sie do webmaila CyberFolks.
2. Wejdz na biuro@polskiecentrumwizowe.pl.
3. Wyslij mail testowy na prywatny Gmail/Outlook.
4. Odpowiedz z Gmail/Outlook na biuro@polskiecentrumwizowe.pl.
5. Sprawdz, czy wysylka i odbior dzialaja w obie strony.
```

Jezeli webmail nie wysyla albo nie odbiera, problem jest w konfiguracji poczty/DNS, nie w aplikacji.

## 7. Test API po deploymentcie

Sprawdz, czy API dziala:

```bash
curl https://api.polskiecentrumwizowe.pl/health
```

Oczekiwany wynik:

```json
{"status":"ok"}
```

Potem wyslij formularz na stronie:

```text
https://polskiecentrumwizowe.pl/konsultacje
```

Oczekiwany efekt:

```text
1. Mail ze zgloszeniem trafia na CONTACT_EMAIL_TO.
2. Klient dostaje mail potwierdzajacy.
3. Nadawca jest widoczny jako Polskie Centrum Wizowe <biuro@polskiecentrumwizowe.pl>.
4. Odpowiedz na mail do biura powinna isc do adresu klienta z formularza.
```

## 8. Test SMTP z serwera przez Node.js

Jezeli formularz nie wysyla maila, mozna wykonac test z katalogu API na hostingu.

Wejdz przez SSH:

```bash
cd ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
```

Uruchom prosty test z aktualnym `.env`:

```bash
node -e "require('dotenv').config(); const nodemailer=require('nodemailer'); const t=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT),secure:process.env.SMTP_SECURE==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}}); t.sendMail({from:process.env.SMTP_FROM,to:process.env.CONTACT_EMAIL_TO,subject:'Test SMTP PCW',text:'Test SMTP z CyberFolks'}).then(r=>{console.log('OK', r.messageId)}).catch(e=>{console.error(e); process.exit(1);});"
```

Jezeli test przejdzie, SMTP jest poprawny. Jezeli nie, blad z konsoli zwykle powie, czy problemem jest haslo, port, host albo blokada logowania.

## 9. Sprawdzenie rekordow DNS

Po zmianie DNS trzeba poczekac na propagacje. Zwykle trwa to od kilku minut do kilku godzin.

Mozesz sprawdzic rekordy lokalnie:

```bash
nslookup -type=mx polskiecentrumwizowe.pl
nslookup -type=txt polskiecentrumwizowe.pl
nslookup -type=txt _dmarc.polskiecentrumwizowe.pl
```

DKIM sprawdza sie po nazwie selektora z panelu CyberFolks, np.:

```bash
nslookup -type=txt default._domainkey.polskiecentrumwizowe.pl
```

Jezeli CyberFolks uzywa innego selektora niz `default`, podmien nazwe.

## 10. Najczestsze problemy

### Blad logowania SMTP

Sprawdz:

```text
1. Czy SMTP_USER to pelny adres e-mail.
2. Czy SMTP_PASS to haslo do skrzynki, nie haslo do panelu.
3. Czy skrzynka istnieje i mozna sie zalogowac do webmaila.
4. Czy nie ma literowki w SMTP_HOST.
```

### Connection timeout

Sprawdz:

```text
1. Czy port jest poprawny.
2. Dla 465 ustaw SMTP_SECURE=true.
3. Dla 587 ustaw SMTP_SECURE=false.
4. Czy hosting pozwala na polaczenia SMTP do wybranego hosta.
```

Przy poczcie CyberFolks z tego samego hostingu najlepiej uzywac hosta SMTP podanego przez CyberFolks.

### Maile trafiaja do spamu

Sprawdz:

```text
1. Czy SPF istnieje i obejmuje CyberFolks.
2. Czy DKIM jest wlaczony.
3. Czy DMARC istnieje.
4. Czy SMTP_FROM jest w tej samej domenie co SMTP_USER.
5. Czy temat i tresc maila nie wygladaja spamowo.
```

W tym projekcie `SMTP_FROM` powinien byc:

```text
"Polskie Centrum Wizowe" <biuro@polskiecentrumwizowe.pl>
```

### Formularz pokazuje blad wysylki, ale webmail dziala

Sprawdz logi API:

```bash
tail -f ~/logs/passenger.log
tail -f ~/domains/api.polskiecentrumwizowe.pl/logs/error_log
```

Sprawdz tez `.env`:

```bash
cd ~/domains/api.polskiecentrumwizowe.pl/public_html/mail-api
grep -E "SMTP_HOST|SMTP_PORT|SMTP_SECURE|SMTP_USER|SMTP_FROM|CONTACT_EMAIL_TO" .env
```

Nie wypisuj publicznie `SMTP_PASS`.

## 11. Bezpieczenstwo

Zasady:

```text
1. Haslo SMTP trzymaj tylko w mail-api/.env na serwerze.
2. Nie dodawaj SMTP_PASS do GitHuba.
3. Nie commituj mail-api/.env.
4. Jezeli haslo wycieknie, zmien haslo skrzynki w CyberFolks i zaktualizuj .env.
5. Uzywaj oddzielnej skrzynki do formularzy, np. biuro@.
```

## 12. Checklista

Przed testem formularzy:

```text
[ ] Skrzynka biuro@polskiecentrumwizowe.pl istnieje.
[ ] Da sie zalogowac do webmaila.
[ ] Wysylka z webmaila dziala.
[ ] Odbior na webmailu dziala.
[ ] MX dla domeny wskazuje na poczte CyberFolks.
[ ] SPF jest ustawiony.
[ ] DKIM jest wlaczony.
[ ] DMARC jest ustawiony przynajmniej jako p=none.
[ ] mail-api/.env zawiera poprawne SMTP_HOST.
[ ] mail-api/.env zawiera poprawne SMTP_PORT.
[ ] mail-api/.env zawiera poprawne SMTP_SECURE.
[ ] mail-api/.env zawiera poprawne SMTP_USER.
[ ] mail-api/.env zawiera poprawne SMTP_PASS.
[ ] SMTP_FROM uzywa adresu biuro@polskiecentrumwizowe.pl.
[ ] CONTACT_EMAIL_TO wskazuje skrzynke odbiorcza.
[ ] API zostalo zrestartowane po zmianie .env.
[ ] /health zwraca {"status":"ok"}.
[ ] Formularz wysyla mail do biura.
[ ] Klient dostaje potwierdzenie.
```
