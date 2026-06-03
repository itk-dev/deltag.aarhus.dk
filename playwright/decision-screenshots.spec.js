// @ts-check
// One-off screenshot capture for the Afgørelse (decision) frist/publiceringsdato
// feature. Run via the helper task that injects a fresh admin login URL.
const { test } = require("@playwright/test");

const BASE = process.env.DECISION_BASE_URL || "http://deltag.local.itkdev.dk:8080";
const LOGIN_URL = process.env.DECISION_LOGIN_URL;
const OVERVIEW_PATH = BASE + (process.env.DECISION_OVERVIEW_PATH || "/afgoerelser");
const DETAIL_PATH = BASE + (process.env.DECISION_DETAIL_PATH || "/node/38");
const EDIT_PATH = BASE + (process.env.DECISION_EDIT_PATH || "/node/32/edit");
const OUT = "screenshots";

const DESKTOP = { width: 1440, height: 1024 };
const MOBILE = { width: 390, height: 844 };

async function settle(page) {
  // Give lazy images / fonts a moment, then wait for network idle.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(800);
}

test("backend edit form (desktop)", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  if (LOGIN_URL) {
    await page.goto(LOGIN_URL);
    await settle(page);
    // The one-time-login page requires confirming via the "Log in" button.
    const loginButton = page.getByRole("button", { name: /log in|log ind/i });
    if (await loginButton.count()) {
      await loginButton.first().click();
      await settle(page);
    }
  }
  await page.goto(EDIT_PATH);
  await settle(page);
  await page.screenshot({ path: `${OUT}/backend-edit.png`, fullPage: true });
});

test("frontend decision detail (desktop)", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto(DETAIL_PATH);
  await settle(page);
  await page.screenshot({ path: `${OUT}/decision-detail.png`, fullPage: true });
});

test("frontend decision detail (mobile)", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(DETAIL_PATH);
  await settle(page);
  await page.screenshot({ path: `${OUT}/decision-detail-mobile.png`, fullPage: true });
});

test("frontend decision overview (desktop)", async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto(OVERVIEW_PATH);
  await settle(page);
  await page.screenshot({ path: `${OUT}/decision-overview.png`, fullPage: true });
});

test("frontend decision overview (mobile)", async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto(OVERVIEW_PATH);
  await settle(page);
  await page.screenshot({ path: `${OUT}/decision-overview-mobile.png`, fullPage: true });
});
