// ============================================================
// PAGE OBJECT MODEL - Patient Form
// ============================================================
// This class represents the dialog used to register a new patient
// and provides methods for interacting with its controls.
// ============================================================

import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class PatientFormPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    // Locators for the patient form dialog and header actions.
    private formDialog = this.page.locator('[data-testid="patient-form-dialog"]');
    private cancelButton = this.page.locator('[data-testid="patient-form-cancel"]');
    private saveButton = this.page.locator('[data-testid="patient-form-save"]');
    private closeButton = this.page.locator('[data-testid="patient-form-close"]');

    // Locators for the patient form tabs.
    private basicInformationTab = this.page.locator('[data-testid="tab-basic"]');
    private telephoneNumbersTab = this.page.locator('[data-testid="tab-phones"]');
    private relationTab = this.page.locator('[data-testid="tab-relations"]');
    private identityTab = this.page.locator('[data-testid="tab-identities"]');

    // Locators for the identity section controls.
    private identityTypeSelect = this.page.locator('[data-testid="identity-type"]');
    private identityValueInput = this.page.locator('[data-testid="identity-value"]');
    private identitySubmitButton = this.page.locator('[data-testid="identity-submit"]');
    private identityResetButton = this.page.locator('[data-testid="identity-reset"]');

    // Locators for the required basic patient information fields.
    private fullNameInput = this.page.getByRole('textbox', { name: /Full name/ });
    private ageInput = this.page.getByRole('spinbutton', { name: /Age/ });
    private sexSelect = this.page.getByRole('combobox', { name: /Sex/ });

    // Locators for the required telephone number fields.
    private contactNumberInput = this.page.getByRole('textbox', { name: /Contact Number/ });
    private telephoneAddButton = this.formDialog.getByRole('button', { name: 'Add', exact: true });

    /**
     * Check whether the patient form dialog is visible.
     */
    async isVisible() {
        return await this.formDialog.isVisible();
    }

    /**
     * Click the Basic Information tab.
     */
    async clickBasicInformationTab() {
        await this.basicInformationTab.click();
    }

    /**
     * Click the Telephone Numbers tab.
     */
    async clickTelephoneNumbersTab() {
        await this.telephoneNumbersTab.click();
    }

    /**
     * Click the Relation tab.
     */
    async clickRelationTab() {
        await this.relationTab.click();
    }

    /**
     * Click the Identity tab.
     */
    async clickIdentityTab() {
        await this.identityTab.click();
    }

    /**
     * Fill the required basic patient information fields.
     * @param fullName -- the patient's full name
     * @param age -- the patient's age
     * @param sex -- the option value, such as Female, Male, or Other
     */
    async fillBasicInformation(fullName: string, age: number, sex: string) {
        await this.basicInformationTab.click();
        await this.fullNameInput.fill(fullName);
        await this.ageInput.fill(age.toString());
        await this.sexSelect.selectOption(sex);
    }

    /**
     * Enter and add the required telephone number.
     * @param contactNumber -- the patient's contact number
     */
    async addTelephoneNumber(contactNumber: string) {
        await this.telephoneNumbersTab.click();
        await this.contactNumberInput.fill(contactNumber);
        await this.telephoneAddButton.click();
    }

    /**
     * Select the type of government identity number.
     * @param identityType -- the option value, such as CNIC, SSN, Passport, or Other
     */
    async selectIdentityType(identityType: string) {
        await this.identityTypeSelect.selectOption(identityType);
    }

    /**
     * Enter a government identity number.
     * @param identityValue -- the identity number to enter
     */
    async enterIdentityValue(identityValue: string) {
        await this.identityValueInput.fill(identityValue);
    }

    /**
     * Add the entered identity number to the identity records table.
     */
    async addIdentity() {
        await this.identitySubmitButton.click();
    }

    /**
     * Reset the identity type and identity number fields.
     */
    async resetIdentity() {
        await this.identityResetButton.click();
    }

    /**
     * Select an identity type and add its value in one action.
     * @param identityType -- the option value, such as CNIC, SSN, Passport, or Other
     * @param identityValue -- the identity number to add
     */
    async addIdentityRecord(identityType: string, identityValue: string) {
        await this.selectIdentityType(identityType);
        await this.enterIdentityValue(identityValue);
        await this.addIdentity();
    }

    /**
     * Save the new patient form.
     */
    async savePatient() {
        await this.saveButton.click();
    }

    /**
     * Cancel patient creation and close the form.
     */
    async cancelPatientForm() {
        await this.cancelButton.click();
    }

    /**
     * Close the patient form with the close icon.
     */
    async closePatientForm() {
        await this.closeButton.click();
    }
}
