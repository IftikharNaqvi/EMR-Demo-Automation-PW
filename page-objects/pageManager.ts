import { Page } from '@playwright/test';
import { NavigationPage } from './navigationPage';
import { LoginPage } from './loginPage';


export class PageManager {
    private readonly navigationPage: NavigationPage;
    private readonly loginPage: LoginPage;
    private readonly patientsPage: PatientsPage;

    constructor(page: Page) {
        this.navigationPage = new NavigationPage(page);
        this.loginPage = new LoginPage(page);
        this.patientsPage = new PatientsPage(page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onLoginPage() {
        return this.loginPage;
    }

    
}
