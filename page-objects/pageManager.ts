import { Page } from '@playwright/test';
import { NavigationPage } from './navigationPage';
import { LoginPage } from './loginPage';
import { PatientsPage } from './patientsPage';
import { PatientFormPage } from './patientFormPage';

export class PageManager {
    private readonly navigationPage: NavigationPage;
    private readonly loginPage: LoginPage;
    private readonly patientsPage: PatientsPage;
    private readonly patientsFormPage: PatientFormPage;

    constructor(page: Page) {
        this.navigationPage = new NavigationPage(page);
        this.loginPage = new LoginPage(page);
        this.patientsPage = new PatientsPage(page);
        this.patientsFormPage = new PatientFormPage(page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onLoginPage() {
        return this.loginPage;
    }

    onPatientsPage() {
        return this.patientsPage;
    }

    onPatientsFormPage() {
        return this.patientsFormPage;
    }
}
