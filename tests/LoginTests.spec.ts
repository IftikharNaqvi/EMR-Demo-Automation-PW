import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

// ============================================================
// SETUP - Run before each test
// ============================================================
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
});

test('Login with valid credentials', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onLoginPage().loginWithValidCredentials(
        'admin',
        'meridian123'
    );
});

test('Login with invalid credentials', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onLoginPage().loginWithInvalidCredentials(
        'test@deapad.com',
        'meridian111'
    );
});
