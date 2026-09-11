// ============================================================
// PRESCRIPTION TESTS
// ============================================================
// This file contains test cases for creating prescriptions.
// ============================================================

import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { PrescriptionPage } from '../page-objects/prescriptionPage';

// ============================================================
// SETUP - Run before each test
// ============================================================
test.beforeEach(async ({ page }) => {
    // Navigate to the application home page
    await page.goto('http://localhost:5173');
});

// ============================================================
// TEST SUITE - Prescription Tests
// ============================================================
test.describe('Prescription Functionality Tests', () => {

    // ============================================================
    // TEST 1 - Create a prescription
    // ============================================================
    test('should create a prescription for a selected patient', async ({ page }) => {
        // Create page-object instances for navigation and prescription workflows
        const pm = new PageManager(page);
        const prescriptionPage = new PrescriptionPage(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Prescriptions page
        await pm.navigateTo().prescriptionsPage();
        await expect(prescriptionPage.isPatientDialogVisible()).resolves.toBe(true);

        // Search for the patient and select the filtered patient row
        await prescriptionPage.searchPatient('Amina');
        await expect(prescriptionPage.getPatientRowCount()).resolves.toBe(1);
        await prescriptionPage.clickNewPrescription(0);
        await prescriptionPage.waitForPrescriptionPage();

        // Fill the prescription vitals and body measurements
        await prescriptionPage.fillVitals(72, 70.5, 68, 98.6);

        // Verify that BMI is calculated from the entered measurements
        await expect(prescriptionPage.getBmiValue()).resolves.toBe('23.6');

        // Fill blood glucose and blood pressure measurements
        await prescriptionPage.fillBloodGlucose(120, 95);
        await prescriptionPage.fillBloodPressure(120, 80);

        // Fill the clinical assessment
        await prescriptionPage.fillClinicalAssessment(
            'Persistent headache for three days',
            'Patient is alert and reports no recent trauma.'
        );

        // Open the medicine configuration dialog and add the prescribed medicine
        await prescriptionPage.clickAddMedicine();
        await expect(prescriptionPage.isMedicineListVisible()).resolves.toBe(true);
        await prescriptionPage.searchMedicine('Arinac');
        await prescriptionPage.selectMedicine('Arinac Suspension');
        await prescriptionPage.addSelectedMedicineToPrescription();
        await expect(prescriptionPage.isMedicineDialogVisible()).resolves.toBe(true);
        await prescriptionPage.configureMedicine(
            1,
            ['morning', 'night'],
            7,
            'After meals',
            'Take with sufficient water.'
        );
        await prescriptionPage.addMedicineAndDone();

        // Open the diagnosis dialog, search for a diagnosis, and select it
        await prescriptionPage.clickAddDiagnosis();
        await expect(prescriptionPage.isDiagnosisDialogVisible()).resolves.toBe(true);
        await prescriptionPage.searchDiagnosis('Allergic rhinitis due to food');
        await expect(prescriptionPage.getDiagnosisRowCount()).resolves.toBe(1);
        await prescriptionPage.selectDiagnosis('J305');
        await expect(prescriptionPage.isDiagnosisDetailsVisible()).resolves.toBe(true);
        await prescriptionPage.enterDiagnosisComments('Food-related allergy noted during assessment.');
        await prescriptionPage.doneSelectingDiagnosis();

        // Save the prescription and verify the success notification
        await prescriptionPage.savePrescription();
        await prescriptionPage.waitForPrescriptionSaved();
    });
});
