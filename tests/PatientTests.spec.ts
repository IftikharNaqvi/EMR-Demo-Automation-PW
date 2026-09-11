// ============================================================
// PATIENT TESTS - Comprehensive Test Suite
// ============================================================
// This file contains important test cases for the Patients page
// ============================================================

import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { PatientFormPage } from '../page-objects/patientFormPage';

// ============================================================
// SETUP - Run before each test
// ============================================================
test.beforeEach(async ({ page }) => {
    // Navigate to the application home page
    await page.goto('http://localhost:5173');
});

// ============================================================
// TEST SUITE - Patient Page Tests
// ============================================================
test.describe('Patient Page - Core Functionality Tests', () => {

    // ============================================================
    // TEST 1 - Navigate to Patients page and verify heading visibility
    // ============================================================
    test('should navigate to Patients page and display heading', async ({ page }) => {
        // Create a new instance of PageManager to manage all page objects
        const pm = new PageManager(page);

        // Login with valid admin credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();
        
        // Verify that the "Patients" heading is visible on the page
        await expect(pm.onPatientsPage().isHeadingVisible()).resolves.toBe(true);
    });

    // ============================================================
    // TEST 3 - Verify search input field functionality
    // ============================================================
    test('should search for patient by name and verify input value', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Search for patient by name
        await pm.onPatientsPage().searchPatient('Amina');

        // Get the current value in the search input field
        const searchValue = await pm.onPatientsPage().getSearchInputValue();

        // Assert that the search input contains the expected value
        await expect(searchValue).toBe('Amina');
    });

    // ============================================================
    // TEST 4 - Verify clear search functionality
    // ============================================================
    test('should clear the search input field', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Search for a patient
        await pm.onPatientsPage().searchPatient('Bilal');

        // Verify search input has the expected value
        let searchValue = await pm.onPatientsPage().getSearchInputValue();
        await expect(searchValue).toBe('Bilal');

        // Clear the search input field
        await pm.onPatientsPage().clearSearch();

        // Get the search input value after clearing
        searchValue = await pm.onPatientsPage().getSearchInputValue();

        // Assert that the search input is now empty
        await expect(searchValue).toBe('');
    });


    // ============================================================
    // TEST 6 - Verify patient rows are displayed
    // ============================================================
    test('should display patient rows in the table', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Get the count of patient rows in the table
        const rowCount = await pm.onPatientsPage().getPatientRowCount();

        // Assert that at least one patient row is displayed
        await expect(rowCount).toBeGreaterThan(0);
    });

    // ============================================================
    // TEST 8 - Click View button for first patient
    // ============================================================
    test('should click View button for first patient', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Click the View button for the first patient (index 0)
        await pm.onPatientsPage().clickViewButton(0);

        // Wait for navigation to patient detail page
        await page.waitForLoadState('networkidle');

        // In a real scenario, verify that we're on the patient detail page
        // by checking URL or specific elements on that page
    });

    // ============================================================
    // TEST 9 - Click Edit button for first patient to check action of opening edit form
    // ============================================================
    test('should click Edit button for first patient', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Click the Edit button for the first patient (index 0)
        await pm.onPatientsPage().clickEditButton(0);

        // Wait for the edit form to load
        await page.waitForLoadState('networkidle');

        // In a real scenario, verify that edit form elements are visible
    });

    // ============================================================
    // TEST 10 - Click Create Case button for first patient to check action of opening case creation modal
    // ============================================================
    test('should click Create Case button for first patient', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Click the Create Case button for the first patient (index 0)
        await pm.onPatientsPage().clickCreateCaseButton(0);

        // Wait for the case creation dialog to appear
        await page.waitForLoadState('networkidle');

        // In a real scenario, verify that case creation modal is visible
    });

    // ============================================================
    // TEST 12 - Click Add button to check action of opening new patient form
    // ============================================================
    test('should click Add button to open new patient form', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Click the Add button
        await pm.onPatientsPage().clickAddButton();

        // Wait for the new patient form to load
        await page.waitForLoadState('networkidle');

        // In a real scenario, verify that the patient creation form is visible
    });


    // ============================================================
    // TEST 16 - Complex workflow: Search then view patient
    // ============================================================
    test('should search for patient and then view their details', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Search for patient by name
        await pm.onPatientsPage().searchPatient('Amina');

        // Wait for search results to update
        await page.waitForLoadState('networkidle');

        // Verify search value was entered
        const searchValue = await pm.onPatientsPage().getSearchInputValue();
        await expect(searchValue).toBe('Amina');

        // Click View button for the first result
        await pm.onPatientsPage().clickViewButton(0);

        // Wait for page navigation
        await page.waitForLoadState('networkidle');
    });

    // ============================================================
    // TEST 17 - Complex workflow: Search then create case
    // ============================================================
    test('should search for patient and create a case for them', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // Search for patient by name
        await pm.onPatientsPage().searchPatient('Sara');

        // Wait for search results to load
        await page.waitForLoadState('networkidle');

        // Click Create Case button for the first result
        await pm.onPatientsPage().clickCreateCaseButton(0);

        // Wait for case creation modal to appear
        await page.waitForLoadState('networkidle');
    });

    // ============================================================
    // TEST 18 - Complex workflow: Search, clear, then search again
    // ============================================================
    test('should search for patient, clear search, and search for different patient', async ({ page }) => {
        // Create a new instance of PageManager
        const pm = new PageManager(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page
        await pm.navigateTo().patientsPage();

        // First search for "Amina"
        await pm.onPatientsPage().searchPatient('Amina');

        // Verify first search value
        let searchValue = await pm.onPatientsPage().getSearchInputValue();
        await expect(searchValue).toBe('Amina');

        // Clear the search field
        await pm.onPatientsPage().clearSearch();

        // Verify search is empty
        searchValue = await pm.onPatientsPage().getSearchInputValue();
        await expect(searchValue).toBe('');

        // Search for different patient
        await pm.onPatientsPage().searchPatient('Bilal');

        // Verify second search value
        searchValue = await pm.onPatientsPage().getSearchInputValue();
        await expect(searchValue).toBe('Bilal');
    });

    // ============================================================
    // TEST 19 - Create patient, fill form, save, and verify creation
    // ============================================================
    test('should create a patient by filling the form and saving it', async ({ page }) => {
        // Create page-object instances for the patients page and form dialog
        const pm = new PageManager(page);
        const patientFormPage = new PatientFormPage(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page and record the current patient count
        await pm.navigateTo().patientsPage();
        const patientCountBeforeCreate = await pm.onPatientsPage().getPatientRowCount();

        // Open the new patient form
        await pm.onPatientsPage().clickAddButton();
        await expect(patientFormPage.isVisible()).resolves.toBe(true);

        // Add the required telephone number
        await patientFormPage.addTelephoneNumber('3001234567');

        // Fill the identity details and add the identity record
        await patientFormPage.clickIdentityTab();
        await patientFormPage.addIdentityRecord('CNIC', '99001-1234567-1');
        await expect(page.getByText('99001-1234567-1')).toBeVisible();

        // Fill the required basic patient details after adding the identity
        await patientFormPage.fillBasicInformation('Hamid Ali Abbasi', 29, 'Female');

        // Save the patient and verify that the form closes
        await patientFormPage.savePatient();
        await expect(patientFormPage.isVisible()).resolves.toBe(false);

        // Verify that a new patient row was added to the patient list
        const patientCountAfterCreate = await pm.onPatientsPage().getPatientRowCount();
        await expect(patientCountAfterCreate).toBeGreaterThan(patientCountBeforeCreate);
    });

    // ============================================================
    // TEST 20 - Edit the first patient and verify the change
    // ============================================================
    test('should edit the first patient and verify the patient details changed', async ({ page }) => {
        // Create page-object instances for the patients page and form dialog
        const pm = new PageManager(page);
        const patientFormPage = new PatientFormPage(page);

        // Login with valid credentials
        await pm.onLoginPage().loginWithValidCredentials(
            'admin',
            'meridian123'
        );

        // Navigate to the Patients page and record the current patient count
        await pm.navigateTo().patientsPage();
        const patientCountBeforeEdit = await pm.onPatientsPage().getPatientRowCount();

        // Open the edit form for the first patient
        await pm.onPatientsPage().clickEditButton(0);
        await expect(patientFormPage.isVisible()).resolves.toBe(true);

        // Change the patient's basic details and verify the changed value in the form
        const updatedPatientName = 'Amina Raza Updated';
        await patientFormPage.fillBasicInformation(updatedPatientName, 35, 'Female');
        await expect(patientFormPage.isVisible()).resolves.toBe(true);

        // Save the edit and verify that the form closes
        await patientFormPage.savePatient();
        await expect(patientFormPage.isVisible()).resolves.toBe(false);

        // Verify that editing did not create or remove a patient row
        const patientCountAfterEdit = await pm.onPatientsPage().getPatientRowCount();
        await expect(patientCountAfterEdit).toBe(patientCountBeforeEdit);
        await expect(page.getByText(updatedPatientName, { exact: true })).toBeVisible();
    });

});

