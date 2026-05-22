const NAVY = "#041c2d";
const RED = "#c42021";
const CREAM = "#f8f7f4";
const GREY = "#6b7280";
const BORDER = "#e5e0d8";

function row(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid ${BORDER};background:${CREAM};">
        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${GREY};">${label}</p>
        <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:${NAVY};line-height:1.5;">${value}</p>
      </td>
    </tr>`;
}

function buildHtml({ formType, fields, logoUrl, siteUrl, replyTo }) {
  const isVisa = formType === "visa";
  const formLabel = isVisa ? "Kwalifikacja wizowa" : "Konsultacja ogólna";
  const subject = isVisa
    ? "Nowe zgłoszenie — kwalifikacja wizowa"
    : "Nowe zgłoszenie — konsultacja ogólna";

  const rows = fields.map(({ label, value }) => row(label, value)).join("");

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${subject}</title>
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
                    <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(225,233,243,0.5);">Nowe zgłoszenie</span>
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
            <td style="background:#ffffff;padding:32px 32px 24px;">
              <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${RED};">${formLabel}</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:${NAVY};line-height:1.2;">Nowe zgłoszenie z formularza</h1>
            </td>
          </tr>

          <!-- Data rows -->
          <tr>
            <td style="background:#ffffff;padding:0 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${BORDER};border-radius:2px;">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;padding:28px 32px 36px;">
              ${replyTo ? `<a href="mailto:${replyTo}" style="display:inline-block;background:${NAVY};color:#ffffff;font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Odpowiedz klientowi</a>` : ""}
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
                Ta wiadomość została wysłana automatycznie z formularza kontaktowego na stronie ${siteUrl.replace(/^https?:\/\//, "")}. Nie odpowiadaj na tego maila bezpośrednio — skorzystaj z przycisku powyżej.
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

module.exports = { buildHtml };
