// ============================================================
// PAGE OBJECT MODEL - Patient Case Form
// ============================================================
// This class represents the dialog used to create a patient case
// and provides methods for interacting with its form controls.
// ============================================================

import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class PatientCaseFormPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    // Locators for the patient case dialog and header actions.
    private caseDialog = this.page.locator('[data-testid="case-dialog"]');
    private editPatientButton = this.caseDialog.getByRole('button', { name: 'Edit', exact: true });
    private closeButton = this.page.locator('[data-testid="case-dialog-close"]');
    private cancelButton = this.page.locator('[data-testid="case-dialog-cancel"]');
    private saveButton = this.page.locator('[data-testid="case-dialog-save"]');

    // Locators for the clinical details section.
    private chiefComplaintInput = this.page.locator('[data-testid="case-chief-complaint"]');
    private doctorSelect = this.page.locator('[data-testid="case-doctor"]');

    // Locators for the core vitals and body measurements.
    private temperatureInput = this.page.getByRole('spinbutton', { name: /Body Temperature/ });
    private pulseInput = this.page.getByRole('spinbutton', { name: /Pulse/ });
    private weightInput = this.page.getByRole('spinbutton', { name: /Weight/ });
    private heightInput = this.page.getByRole('spinbutton', { name: /Height/ });

    // Locators for blood glucose measurements.
    private randomBloodSugarInput = this.page.getByRole('spinbutton', { name: /Random Blood Sugar/ });
    private fastingBloodSugarInput = this.page.getByRole('spinbutton', { name: /Fasting Blood Sugar/ });

    // Locators for blood pressure measurements.
    private systolicBloodPressureInput = this.page.getByRole('spinbutton', { name: /BP Systolic/ });
    private diastolicBloodPressureInput = this.page.getByRole('spinbutton', { name: /BP Diastolic/ });

    /**
     * Check whether the patient case dialog is visible.
     */
    async isVisible() {
        return await this.caseDialog.isVisible();
    }

    /**
     * Click the Edit button for the patient displayed in the case dialog.
     */
    async clickEditPatient() {
        await this.editPatientButton.click();
    }

    /**
     * Enter the patient's chief complaint.
     * @param chiefComplaint -- the reason for the patient's visit
     */
    async enterChiefComplaint(chiefComplaint: string) {
        await this.chiefComplaintInput.fill(chiefComplaint);
    }

    /**
     * Assign the case to a doctor.
     * @param doctorName -- the option value of the doctor to assign
     */
    async assignDoctor(doctorName: string) {
        await this.doctorSelect.selectOption(doctorName);
    }

    /**
     * Fill the clinical details for the patient case.
     * @param chiefComplaint -- the reason for the patient's visit
     * @param doctorName -- the option value of the doctor to assign
     */
    async fillClinicalDetails(chiefComplaint: string, doctorName?: string) {
        await this.enterChiefComplaint(chiefComplaint);

        if (doctorName) {
            await this.assignDoctor(doctorName);
        }
    }

    /**
     * Enter core vital and body measurement values.
     * @param temperature -- body temperature in degrees Fahrenheit
     * @param pulse -- pulse rate in beats per minute
     * @param weight -- body weight in kilograms
     * @param height -- body height in inches
     */
    async fillVitalsAndMeasurements(
        temperature: number,
        pulse: number,
        weight: number,
        height: number
    ) {
        await this.temperatureInput.fill(temperature.toString());
        await this.pulseInput.fill(pulse.toString());
        await this.weightInput.fill(weight.toString());
        await this.heightInput.fill(height.toString());
    }

    /**
     * Enter blood glucose measurements.
     * @param randomBloodSugar -- random blood sugar in mg/dL
     * @param fastingBloodSugar -- fasting blood sugar in mg/dL
     */
    async fillBloodGlucose(randomBloodSugar: number, fastingBloodSugar: number) {
        await this.randomBloodSugarInput.fill(randomBloodSugar.toString());
        await this.fastingBloodSugarInput.fill(fastingBloodSugar.toString());
    }

    /**
     * Enter blood pressure measurements.
     * @param systolic -- systolic blood pressure in mmHg
     * @param diastolic -- diastolic blood pressure in mmHg
     */
    async fillBloodPressure(systolic: number, diastolic: number) {
        await this.systolicBloodPressureInput.fill(systolic.toString());
        await this.diastolicBloodPressureInput.fill(diastolic.toString());
    }

    /**
     * Save the patient case.
     */
    async saveCase() {
        await this.saveButton.click();
    }

    /**
     * Cancel case creation and close the dialog.
     */
    async cancelCase() {
        await this.cancelButton.click();
    }

    /**
     * Close the patient case dialog with the close icon.
     */
    async closeCaseDialog() {
        await this.closeButton.click();
    }
}
