// ============================================================
// PAGE OBJECT MODEL - Patient Page
// ============================================================
// This class represents the Patients list page and provides
// methods to interact with all major elements on the page
// ============================================================

import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class PatientsPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    // Locators (centralized for maintainability)
    private searchInput = this.page.locator('[data-testid="patient-search"]');
    private addButton = this.page.locator('[data-testid="add-patient"]');
    private patientsHeading = this.page.locator('h1:has-text("Patients")');
    // NOTE: not defined in the original file - confirm this selector against the real table markup
    private patientRows = this.page.locator('[data-testid="patient-row"]');
    private viewButtons = this.page.locator('[data-testid="action-view"]');
    private editButtons = this.page.locator('[data-testid="action-edit"]');
    private createCaseButtons = this.page.locator('[data-testid="action-create-case"]');

    /**
     * Method to type text into the patient search input field
     * @param searchTerm  -- the name or MRN to search for
     */
    async searchPatient(searchTerm: string) {
        await this.searchInput.clear();
        await this.searchInput.fill(searchTerm);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Method to click the "Add" button to create a new patient
     */
    async clickAddButton() {
        await this.addButton.click();
    }

    /**
     * Method to check whether the "Patients" heading is visible
     */
    async isHeadingVisible() {
        return await this.patientsHeading.isVisible();
    }

    /**
     * Method to get the current value in the search input field
     */
    async getSearchInputValue() {
        return await this.searchInput.inputValue();
    }

    /**
     * Method to clear the search input field
     */
    async clearSearch() {
        await this.searchInput.clear();
    }

    /**
     * Method to check whether the search input is visible
     */
    async isSearchInputVisible() {
        return await this.searchInput.isVisible();
    }

    /**
     * Method to check whether the "Add" button is visible
     */
    async isAddButtonVisible() {
        return await this.addButton.isVisible();
    }

    /**
     * Method to get the text displayed on the "Add" button
     */
    async getAddButtonText() {
        return await this.addButton.textContent();
    }

    /**
     * Method to get the total number of patient rows displayed
     */
    async getPatientRowCount() {
        return await this.patientRows.count();
    }

    /**
     * Method to click the "View" button for a specific patient row
     * @param rowIndex  -- the zero-based index of the patient row
     */
    async clickViewButton(rowIndex: number) {
        await this.viewButtons.nth(rowIndex).click();
    }

    /**
     * Method to click the "Edit" button for a specific patient row
     * @param rowIndex  -- the zero-based index of the patient row
     */
    async clickEditButton(rowIndex: number) {
        await this.editButtons.nth(rowIndex).click();
    }

    /**
     * Method to click the "Create case" button for a specific patient row
     * @param rowIndex  -- the zero-based index of the patient row
     */
    async clickCreateCaseButton(rowIndex: number) {
        await this.createCaseButtons.nth(rowIndex).click();
    }

    /**
     * Method to check whether the patient page is fully loaded
     */
    async isPageFullyLoaded() {
        const headingVisible = await this.patientsHeading.isVisible();
        const searchVisible = await this.searchInput.isVisible();
        const addButtonVisible = await this.addButton.isVisible();
        const hasPatients = (await this.getPatientRowCount()) > 0;

        return headingVisible && searchVisible && addButtonVisible && hasPatients;
    }
}

// ============================================================
// INTERFACE - Define the structure of patient row data
// ============================================================
/**
 * Interface defining the structure of patient information
 * extracted from a single row in the patient table
 */
export interface PatientRowData {
  // Patient's full name
  name: string;
  // Patient's age and gender (e.g., "34 · F")
  ageGender: string;
  // Patient's Medical Record Number (e.g., "MRN-004821")
  mrn: string;
  // Name of the provider assigned to the patient
  provider: string;
  // Current status of the patient (e.g., "Stable", "Needs review")
  status: string;
  // Number of cases associated with the patient (empty if none)
  caseCount: string;
}