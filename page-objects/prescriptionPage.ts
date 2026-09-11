// ============================================================
// PAGE OBJECT MODEL - Prescription Page
// ============================================================
// This class represents the patient selector and prescription
// workspace used to create a new patient prescription.
// ============================================================

import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class PrescriptionPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    // Locators for the patient selector dialog.
    private patientDialog = this.page.locator('[data-testid="prescription-patient-dialog"]');
    private patientSearchInput = this.page.locator('[data-testid="prescription-patient-search"]');
    private patientRows = this.page.locator('[data-testid="prescription-patient-row"]');
    private newPrescriptionButtons = this.patientRows.locator('[data-testid="new-prescription"]');
    private patientDialogCloseButton = this.page.locator('[data-testid="prescription-dialog-close"]');

    // Locators for the prescription workspace header.
    private savePrescriptionButton = this.page.getByRole('button', { name: 'Save', exact: true });
    private prescriptionHeading = this.page.getByRole('heading', { name: 'New prescription', exact: true });
    private closePrescriptionButton = this.page.getByRole('button', { name: 'Close prescription' });
    private prescriptionSavedToast = this.page.locator('[role="status"]').filter({
        hasText: 'Prescription saved.'
    });

    // Locators for prescription vitals and measurements.
    private pulseInput = this.page.getByRole('spinbutton', { name: 'Pulse (bpm)' });
    private weightInput = this.page.getByRole('spinbutton', { name: 'Weight (kg)' });
    private heightInput = this.page.getByRole('spinbutton', { name: 'Height (in)' });
    private bmiInput = this.page.getByRole('spinbutton', { name: 'BMI (Auto)' });
    private temperatureInput = this.page.getByRole('spinbutton', { name: 'Temp (F)' });
    private randomBloodSugarInput = this.page.getByRole('spinbutton', { name: 'RBS (mg/dL)' });
    private fastingBloodSugarInput = this.page.getByRole('spinbutton', { name: 'FBS (mg/dL)' });
    private systolicBloodPressureInput = this.page.getByRole('spinbutton', { name: 'BP Sys (mmHg)' });
    private diastolicBloodPressureInput = this.page.getByRole('spinbutton', { name: 'BP Dia (mmHg)' });

    // Locators for the clinical assessment section.
    private chiefComplaintInput = this.page.locator('[data-testid="prescription-chief-complaint"]');
    private findingsInput = this.page.locator('[data-testid="prescription-findings"]');

    // Locators for treatment plan actions.
    private addMedicineButton = this.page.getByRole('button', { name: 'Add medicine', exact: true });
    private addDiagnosisButton = this.page.getByRole('button', { name: 'Add diagnosis', exact: true });

    // Locators for the medicine configuration dialog.
    private medicineListDialog = this.page.getByRole('dialog', { name: 'Search Medicine' });
    private medicineSearchInput = this.medicineListDialog.getByPlaceholder('Search medicines...');
    private medicineListCloseButton = this.medicineListDialog.getByRole('button', { name: 'Close', exact: true });
    private addMedicineToPrescriptionButton = this.medicineListDialog.getByRole('button', { name: 'Add to Prescription', exact: true });
    private medicineDialog = this.page.getByRole('dialog', { name: 'Configure Medicine' });
    private medicineDosageInput = this.medicineDialog.getByRole('spinbutton', { name: /Dosage Qty/ });
    private medicineDurationInput = this.medicineDialog.getByRole('spinbutton', { name: /Duration \(days\)/ });
    private medicineTimingMorning = this.medicineDialog.getByRole('checkbox', { name: 'morning' });
    private medicineTimingAfternoon = this.medicineDialog.getByRole('checkbox', { name: 'afternoon' });
    private medicineTimingNight = this.medicineDialog.getByRole('checkbox', { name: 'night' });
    private medicineInstructionSelect = this.medicineDialog.getByRole('combobox', { name: 'Instructions' });
    private medicineCommentsInput = this.medicineDialog.getByRole('textbox', { name: 'Comments' });
    private medicineCancelButton = this.medicineDialog.getByRole('button', { name: 'Cancel', exact: true });
    private medicineSaveAndAddAnotherButton = this.medicineDialog.getByRole('button', { name: 'Save & Add Another', exact: true });
    private medicineAddAndDoneButton = this.medicineDialog.getByRole('button', { name: 'Add & Done', exact: true });
    private medicineCloseButton = this.medicineDialog.getByRole('button', { name: 'Close', exact: true });
    private medicineBackButton = this.medicineDialog.getByRole('button').first();

    // Locators for the diagnosis search dialog.
    private diagnosisDialog = this.page.getByRole('dialog', { name: 'Search Diagnosis' });
    private diagnosisSearchInput = this.diagnosisDialog.getByPlaceholder('Search diagnoses...');
    private diagnosisRows = this.diagnosisDialog.locator('table tbody tr');
    private diagnosisSelectButtons = this.diagnosisRows.getByRole('button', { name: 'Select', exact: true });
    private diagnosisDoneButton = this.diagnosisDialog.getByRole('button', { name: 'Done', exact: true });
    private diagnosisCloseButton = this.diagnosisDialog.getByRole('button', { name: 'Close', exact: true });
    private diagnosisDetailsDialog = this.page.getByRole('dialog', { name: 'Diagnosis Details' });
    private diagnosisCommentsInput = this.diagnosisDetailsDialog.getByRole('textbox', { name: /Comments/ });
    private diagnosisAddAndDoneButton = this.diagnosisDetailsDialog.getByRole('button', { name: 'Add & Done', exact: true });
    private diagnosisAddAnotherButton = this.diagnosisDetailsDialog.getByRole('button', { name: 'Add Another', exact: true });

    /**
     * Check whether the patient selector dialog is visible.
     */
    async isPatientDialogVisible() {
        return await this.patientDialog.isVisible();
    }

    /**
     * Search for a patient by name or MRN.
     * @param searchTerm -- the patient name or MRN to search for
     */
    async searchPatient(searchTerm: string) {
        await this.patientSearchInput.fill(searchTerm);
    }

    /**
     * Get the number of patients currently shown in the selector table.
     */
    async getPatientRowCount() {
        return await this.patientRows.count();
    }

    /**
     * Click New Prescription for a specific patient row.
     * @param rowIndex -- the zero-based patient row index
     */
    async clickNewPrescription(rowIndex: number) {
        await this.newPrescriptionButtons.nth(rowIndex).click();
    }

    /**
     * Close the patient selector dialog.
     */
    async closePatientDialog() {
        await this.patientDialogCloseButton.click();
    }

    /**
     * Check whether the prescription workspace is visible.
     */
    async isPrescriptionPageVisible() {
        return await this.prescriptionHeading.isVisible();
    }

    /**
     * Wait until the prescription workspace is rendered.
     */
    async waitForPrescriptionPage() {
        await this.prescriptionHeading.waitFor({ state: 'visible' });
    }

    /**
     * Wait until the prescription workspace is closed.
     */
    async waitForPrescriptionPageToClose() {
        await this.prescriptionHeading.waitFor({ state: 'hidden' });
    }

    /**
     * Check whether the prescription saved confirmation is visible.
     */
    async isPrescriptionSavedVisible() {
        return await this.prescriptionSavedToast.isVisible();
    }

    /**
     * Wait until the prescription saved confirmation is displayed.
     */
    async waitForPrescriptionSaved() {
        await this.prescriptionSavedToast.waitFor({ state: 'visible' });
    }

    /**
     * Fill the prescription vitals and body measurements.
     * @param pulse -- pulse rate in beats per minute
     * @param weight -- body weight in kilograms
     * @param height -- body height in inches
     * @param temperature -- body temperature in degrees Fahrenheit
     */
    async fillVitals(
        pulse: number,
        weight: number,
        height: number,
        temperature: number
    ) {
        await this.pulseInput.fill(pulse.toString());
        await this.weightInput.fill(weight.toString());
        await this.heightInput.fill(height.toString());
        await this.temperatureInput.fill(temperature.toString());
    }

    /**
     * Get the automatically calculated BMI value.
     */
    async getBmiValue() {
        return await this.bmiInput.inputValue();
    }

    /**
     * Fill blood glucose measurements.
     * @param randomBloodSugar -- random blood sugar in mg/dL
     * @param fastingBloodSugar -- fasting blood sugar in mg/dL
     */
    async fillBloodGlucose(randomBloodSugar: number, fastingBloodSugar: number) {
        await this.randomBloodSugarInput.fill(randomBloodSugar.toString());
        await this.fastingBloodSugarInput.fill(fastingBloodSugar.toString());
    }

    /**
     * Fill blood pressure measurements.
     * @param systolic -- systolic blood pressure in mmHg
     * @param diastolic -- diastolic blood pressure in mmHg
     */
    async fillBloodPressure(systolic: number, diastolic: number) {
        await this.systolicBloodPressureInput.fill(systolic.toString());
        await this.diastolicBloodPressureInput.fill(diastolic.toString());
    }

    /**
     * Enter the chief complaint for the prescription.
     * @param chiefComplaint -- the patient's reason for the visit
     */
    async enterChiefComplaint(chiefComplaint: string) {
        await this.chiefComplaintInput.fill(chiefComplaint);
    }

    /**
     * Enter clinical findings for the prescription.
     * @param findings -- the clinical findings and observations
     */
    async enterFindings(findings: string) {
        await this.findingsInput.fill(findings);
    }

    /**
     * Fill the clinical assessment fields.
     * @param chiefComplaint -- the patient's reason for the visit
     * @param findings -- the clinical findings and observations
     */
    async fillClinicalAssessment(chiefComplaint: string, findings: string) {
        await this.enterChiefComplaint(chiefComplaint);
        await this.enterFindings(findings);
    }

    /**
     * Open the medication entry control.
     */
    async clickAddMedicine() {
        await this.addMedicineButton.click();
    }

    /**
     * Open the diagnosis entry control.
     */
    async clickAddDiagnosis() {
        await this.addDiagnosisButton.click();
    }

    /**
     * Check whether the medicine configuration dialog is visible.
     */
    async isMedicineDialogVisible() {
        return await this.medicineDialog.isVisible();
    }

    /**
     * Check whether the medicine search dialog is visible.
     */
    async isMedicineListVisible() {
        return await this.medicineListDialog.isVisible();
    }

    /**
     * Search for a medicine by name.
     * @param searchTerm -- the medicine name to search for
     */
    async searchMedicine(searchTerm: string) {
        await this.medicineSearchInput.fill(searchTerm);
    }

    /**
     * Select a medicine from the search results.
     * @param medicineName -- the medicine name to select
     */
    async selectMedicine(medicineName: string) {
        await this.medicineListDialog.getByRole('button', { name: new RegExp(medicineName, 'i') }).click();
    }

    /**
     * Add the selected medicine to the prescription and open its configuration.
     */
    async addSelectedMedicineToPrescription() {
        await this.addMedicineToPrescriptionButton.click();
    }

    /**
     * Close the medicine search dialog without selecting a medicine.
     */
    async closeMedicineList() {
        await this.medicineListCloseButton.click();
    }

    /**
     * Fill the medicine dosage and duration values.
     * @param dosageQuantity -- the quantity taken at each timing
     * @param durationDays -- the number of days for the medicine
     */
    async fillMedicineDosage(dosageQuantity: number, durationDays: number) {
        await this.medicineDosageInput.fill(dosageQuantity.toString());
        await this.medicineDurationInput.fill(durationDays.toString());
    }

    /**
     * Select the medicine timing options.
     * @param timings -- one or more values: morning, afternoon, or night
     */
    async selectMedicineTimings(timings: string[]) {
        const timingCheckboxes = {
            morning: this.medicineTimingMorning,
            afternoon: this.medicineTimingAfternoon,
            night: this.medicineTimingNight
        };

        for (const timing of timings) {
            const checkbox = timingCheckboxes[timing as keyof typeof timingCheckboxes];

            if (!checkbox) {
                throw new Error(`Unsupported medicine timing: ${timing}`);
            }

            await checkbox.check();
        }
    }

    /**
     * Select an optional medicine instruction.
     * @param instruction -- the option text, such as After meals or With water
     */
    async selectMedicineInstruction(instruction: string) {
        await this.medicineInstructionSelect.selectOption({ label: instruction });
    }

    /**
     * Enter optional medicine comments.
     * @param comments -- additional medicine instructions or notes
     */
    async enterMedicineComments(comments: string) {
        await this.medicineCommentsInput.fill(comments);
    }

    /**
     * Fill and configure a medicine in one action.
     * @param dosageQuantity -- the quantity taken at each timing
     * @param timings -- one or more values: morning, afternoon, or night
     * @param durationDays -- the number of days for the medicine
     * @param instruction -- optional instruction text
     * @param comments -- optional medicine comments
     */
    async configureMedicine(
        dosageQuantity: number,
        timings: string[],
        durationDays: number,
        instruction?: string,
        comments?: string
    ) {
        await this.fillMedicineDosage(dosageQuantity, durationDays);
        await this.selectMedicineTimings(timings);

        if (instruction) {
            await this.selectMedicineInstruction(instruction);
        }

        if (comments) {
            await this.enterMedicineComments(comments);
        }
    }

    /**
     * Save the configured medicine and finish medicine selection.
     */
    async addMedicineAndDone() {
        await this.medicineAddAndDoneButton.click();
    }

    /**
     * Save the configured medicine and open another medicine form.
     */
    async saveMedicineAndAddAnother() {
        await this.medicineSaveAndAddAnotherButton.click();
    }

    /**
     * Cancel medicine selection.
     */
    async cancelMedicine() {
        await this.medicineCancelButton.click();
    }

    /**
     * Return to the medicine list from the configuration dialog.
     */
    async goBackToMedicineList() {
        await this.medicineBackButton.click();
    }

    /**
     * Close the medicine configuration dialog.
     */
    async closeMedicineDialog() {
        await this.medicineCloseButton.click();
    }

    /**
     * Check whether the diagnosis dialog is visible.
     */
    async isDiagnosisDialogVisible() {
        return await this.diagnosisDialog.isVisible();
    }

    /**
     * Check whether the selected diagnosis details dialog is visible.
     */
    async isDiagnosisDetailsVisible() {
        return await this.diagnosisDetailsDialog.isVisible();
    }

    /**
     * Search for a diagnosis by code or name.
     * @param searchTerm -- the diagnosis code or name to search for
     */
    async searchDiagnosis(searchTerm: string) {
        await this.diagnosisSearchInput.fill(searchTerm);
    }

    /**
     * Get the number of diagnosis results currently displayed.
     */
    async getDiagnosisRowCount() {
        return await this.diagnosisRows.count();
    }

    /**
     * Select a diagnosis from a specific result row.
     * @param rowIndex -- the zero-based diagnosis row index
     */
    async selectDiagnosisByRow(rowIndex: number) {
        await this.diagnosisSelectButtons.nth(rowIndex).click();
    }

    /**
     * Select a diagnosis by its code or name.
     * @param diagnosis -- the diagnosis code or name to select
     */
    async selectDiagnosis(diagnosis: string) {
        const diagnosisRow = this.diagnosisRows.filter({ hasText: diagnosis }).first();
        await diagnosisRow.getByRole('button', { name: 'Select', exact: true }).click();
    }

    /**
     * Enter optional comments for the selected diagnosis.
     * @param comments -- additional notes for the diagnosis
     */
    async enterDiagnosisComments(comments: string) {
        await this.diagnosisCommentsInput.fill(comments);
    }

    /**
     * Add the selected diagnosis and return to the prescription workspace.
     */
    async addDiagnosisAndDone() {
        await this.diagnosisAddAndDoneButton.click();
    }

    /**
     * Add the selected diagnosis and keep the diagnosis details workflow open.
     */
    async addDiagnosisAndAnother() {
        await this.diagnosisAddAnotherButton.click();
    }

    /**
     * Finish diagnosis selection and close the diagnosis dialog.
     */
    async doneSelectingDiagnosis() {
        if (await this.diagnosisDetailsDialog.isVisible()) {
            await this.addDiagnosisAndDone();
            return;
        }

        await this.diagnosisDoneButton.click();
    }

    /**
     * Close the diagnosis dialog without selecting another diagnosis.
     */
    async closeDiagnosisDialog() {
        await this.diagnosisCloseButton.click();
    }

    /**
     * Save the prescription.
     */
    async savePrescription() {
        await this.savePrescriptionButton.click();
    }

    /**
     * Close the prescription workspace.
     */
    async closePrescription() {
        await this.closePrescriptionButton.click();
    }
}
