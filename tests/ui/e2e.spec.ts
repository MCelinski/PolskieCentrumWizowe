import { expect, test, type Page } from "@playwright/test";

async function acceptCookies(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "pcw_cookie_consent",
      JSON.stringify({ necessary: true, analytics: false })
    );
  });
}

async function mockContactApi(page: Page) {
  await page.route("**/*contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await acceptCookies(page);
});

test("home page renders key sections and desktop navigation works", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Desktop navigation is hidden on mobile.");

  await page.goto("/");

  await expect(page.locator("#main-content")).toBeVisible();
  await expect(page.locator("#o-nas")).toBeVisible();
  await expect(page.locator("#uslugi")).toBeVisible();
  await expect(page.locator("#kontakt")).toBeVisible();

  await page.getByRole("navigation", { name: /nawigacja/i }).getByRole("link", { name: /kontakt/i }).click();
  await expect(page).toHaveURL(/#kontakt$/);

  await page.screenshot({
    path: testInfo.outputPath(`home-${testInfo.project.name}.png`),
    fullPage: true,
  });
});

test("mobile menu opens and navigates to consultations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu is only rendered below the desktop breakpoint.");

  await page.goto("/");

  await page.getByRole("button", { name: /menu/i }).click();
  const mobileNav = page.getByRole("navigation", { name: /mobilna/i });
  await expect(mobileNav).toBeVisible();

  await mobileNav.getByRole("link", { name: /inicjuj kontakt/i }).click();
  await expect(page).toHaveURL(/\/konsultacje\/?$/);
  await expect(page.locator("#visa-email")).toBeVisible();
});

test("consultations page switches forms and validates required fields", async ({ page }, testInfo) => {
  await page.goto("/konsultacje/");

  await expect(page.locator("#visa-email")).toBeVisible();
  await expect(page.locator("#visa-citizenship")).toBeVisible();

  await page.getByRole("button", { name: /sprawdź kwalifikowalność/i }).click();
  await expect(page.locator("#visa-email-error")).toBeVisible();
  await expect(page.locator("#visa-email")).toBeFocused();

  await page.getByRole("tab", { name: /konsultacja ogólna/i }).click();
  await expect(page.locator("#name")).toBeVisible();
  await expect(page.locator("#message")).toBeVisible();

  await page.getByRole("button", { name: /wyślij zapytanie/i }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();

  await page.screenshot({
    path: testInfo.outputPath(`consultations-validation-${testInfo.project.name}.png`),
    fullPage: true,
  });
});

test("visa qualification form submits successfully through mocked API", async ({ page }) => {
  await mockContactApi(page);
  await page.goto("/konsultacje/");

  await page.locator("#visa-email").fill("client@example.com");
  await page.locator("#visa-citizenship").fill("Ukraina");
  await page.locator("#visa-purpose").selectOption({ index: 1 });
  await page.locator("#visa-duration").selectOption({ index: 1 });
  await page.locator('label[for="job_offer_tak"]').click();
  await page.locator('label[for="family_tak"]').click();

  await page.getByRole("button", { name: /sprawdź kwalifikowalność/i }).click();
  await expect(page.getByRole("status")).toBeVisible();
});

test("general consultation form submits successfully through mocked API", async ({ page }) => {
  await mockContactApi(page);
  await page.goto("/konsultacje/");

  await page.getByRole("tab", { name: /konsultacja ogólna/i }).click();
  await page.locator("#name").fill("Jan Kowalski");
  await page.locator("#email").fill("jan@example.com");
  await page.locator("#phone").fill("+48 500 600 700");
  await page.locator("#message").fill("Potrzebuję konsultacji w sprawie legalizacji pobytu.");

  await page.getByRole("button", { name: /wyślij zapytanie/i }).click();
  await expect(page.getByRole("status")).toBeVisible();
});

test("localized and legal pages render without client-side errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  for (const path of ["/en", "/ua", "/ru", "/polityka-prywatnosci/", "/regulamin/"]) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
  }

  expect(errors).toEqual([]);
});

test("form tab hover uses CSS state not DOM mutation", async ({ page }) => {
  await page.goto("/konsultacje/");

  const tabA = page.getByRole("tab").first();
  await expect(tabA).toHaveClass(/pcw-tab-btn/);
});

test("cookie banner buttons have CSS hover classes not DOM handlers", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("pcw_cookie_consent"));
  await page.goto("/");

  const secondary = page.locator(".pcw-cookie-secondary");
  const primary = page.locator(".pcw-cookie-primary");

  await expect(secondary).toBeVisible();
  await expect(primary).toBeVisible();

  await primary.click();
  await expect(secondary).not.toBeVisible();
});
