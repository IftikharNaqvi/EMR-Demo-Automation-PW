// ============================================================
// PAGE OBJECT MODEL - Login Page
// ============================================================
// This class represents the Patients list page and provides
// methods to interact with all major elements on the page
// ============================================================

import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { PageManager } from '../page-objects/pageManager'

export class LoginPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    // Locators (centralized for maintainability)
    private emailInput = this.page.getByPlaceholder('Enter your username');
    private passwordInput = this.page.getByPlaceholder('Enter your password');
    private loginButton = this.page.getByRole('button', { name: 'Sign in' });
    // private registerLink = this.page.getByText('Register');
    private errorMessage = this.page.getByRole('alert'); // adjust if needed
    private donateNowButton = this.page.getByRole('button', { name: 'Donate Now' });
    private registerButton = this.page.getByRole('button', { name: 'Register' });
    /**
     * Method to perform login with valid credentials
     * @param email  -- email address to login
     * @param password  -- password to login
     */
    async loginWithValidCredentials(email: string, password: string) {
        const pm = new PageManager(this.page)

        await this.emailInput.click();
        await this.emailInput.pressSequentially(email, { delay: 50 });
    
        await this.passwordInput.click();
        await this.passwordInput.pressSequentially(password, { delay: 50 });
    
        // Ensure React state fully updates
        await this.page.waitForTimeout(2000);
    
        await this.loginButton.click();
    
        // Wait for navigation/network
        await this.page.waitForLoadState('networkidle');
                
        await expect(
            this.page.getByRole('heading', { name: 'Dashboard' })
        ).toBeVisible({ timeout: 15000 });

    }

    /**
     * Method to perform login with invalid credentials and validate error message
     * @param email  -- email address to login
     * @param password  -- password to login
     */
    async loginWithInvalidCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        // Validate error message appears
        await expect(this.errorMessage).toBeVisible();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    
    async clickDonateNowButton() {
        await this.donateNowButton.click();
    }
}