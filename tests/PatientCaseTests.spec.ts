// ============================================================
// PATIENT CASE TESTS
// ============================================================
// This file contains test cases for creating patient cases.
// ============================================================

import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { PatientCaseFormPage } from '../page-objects/PatientCaseFormPage';

// ============================================================
// SETUP - Run before each test
// ============================================================
test.beforeEach(async ({ page }) => {
    // Navigate to the application home page
    await page.goto('http://localhost:5173');
});

// ============================================================
// TEST SUITE - Patient Case Tests
// ============================================================
test.describe('Patient Case Functionality Tests', () => {

    // ============================================================
    // TEST 1 - Create a patient case
    // ============================================================
    test('should create a patient case for the first patient', async ({ page }) => {
        // Create page-object instances for the patients page and case form
        const pm = new PageManager(page);
        const patientCaseFormPage = new PatientCaseFormPage(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Open the case form for the first patient
        await pm.onPatientsPage().clickCreateCaseButton(0);
        await expect(patientCaseFormPage.isVisible()).resolves.toBe(true);

        // Fill the clinical details for the patient case
        await patientCaseFormPage.fillClinicalDetails(
            'Persistent headache for three days',
            'Dr. Faisal Hameed'
        );

        // Fill the patient's vital signs and body measurements
        await patientCaseFormPage.fillVitalsAndMeasurements(98.6, 72, 70.5, 68);

        // Fill the patient's blood glucose measurements
        await patientCaseFormPage.fillBloodGlucose(120, 95);

        // Fill the patient's blood pressure measurements
        await patientCaseFormPage.fillBloodPressure(120, 80);

        // Save the patient case and verify that the dialog closes
        await patientCaseFormPage.saveCase();
        await expect(patientCaseFormPage.isVisible()).resolves.toBe(false);
    });
});
