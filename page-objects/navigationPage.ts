import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }


    async dashboardPage() {
        await this.selectGoupMenuItem('Dashboard');
    }

    async patientsPage() {
        await this.selectGoupMenuItem('Patients');
    }

    async appoinmentsPage() {
        await this.selectGoupMenuItem('Appointments');
    }

    async prescriptionsPage() {
        await this.selectGoupMenuItem('Prescriptions');
    }

    private async selectGoupMenuItem(menuItemTitle: string) {

        const menuItem = this.page.getByRole('link', {
            name: menuItemTitle
        });

        await expect(menuItem).toBeVisible();

        await menuItem.click();

        await this.page.waitForLoadState('networkidle');
    }
}