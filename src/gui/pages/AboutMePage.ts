import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutMePage extends BasePage {
  private myInfoNavLink = this.page.locator(
    '//aside//nav//a[normalize-space()="My Info"]',
  );
  private profileDisplayName = this.page.locator(
    '//div[contains(@class,"orangehrm-edit-employee-name")]',
  );
  private personalDetailsHeading = this.page.locator(
    '//h6[normalize-space()="Personal Details"]',
  );
  private employeeFullNameLabel = this.page.locator(
    '//label[normalize-space()="Employee Full Name"]',
  );
  private firstNameInput = this.page.locator('//input[@name="firstName"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens My Info (personal profile) from the main sidebar.
   * @returns this for chaining
   */
  async step_openFromSidebar(): Promise<this> {
    await this.myInfoNavLink.click();
    await this.page.waitForURL(/viewPersonalDetails/, { timeout: 15000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the My Info personal-details view is open.
   * @returns this for chaining
   */
  async verify_onAboutMePage(): Promise<this> {
    await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 15000 });
    await this.profileDisplayName.waitFor({ state: 'visible', timeout: 15000 });
    return this;
  }

  /**
   * Verifies the profile header shows the expected display name.
   * @param expectedName - Full name shown on the profile header
   * @returns this for chaining
   */
  async verify_displayName(expectedName: string): Promise<this> {
    expect((await this.profileDisplayName.innerText()).trim()).toBe(expectedName);
    return this;
  }

  /**
   * Verifies the Personal Details section heading is visible.
   * @param expectedHeading - Expected section heading text
   * @returns this for chaining
   */
  async verify_personalDetailsHeading(expectedHeading: string): Promise<this> {
    await this.personalDetailsHeading.waitFor({ state: 'visible', timeout: 15000 });
    expect((await this.personalDetailsHeading.innerText()).trim()).toBe(
      expectedHeading,
    );
    return this;
  }

  /**
   * Verifies the Employee Full Name field label is shown.
   * @param expectedLabel - Expected label text
   * @returns this for chaining
   */
  async verify_employeeFullNameLabel(expectedLabel: string): Promise<this> {
    await this.employeeFullNameLabel.waitFor({ state: 'visible', timeout: 15000 });
    expect((await this.employeeFullNameLabel.innerText()).trim()).toBe(expectedLabel);
    return this;
  }

  /**
   * Verifies the first-name input matches the expected value.
   * @param expectedFirstName - Expected first name
   * @returns this for chaining
   */
  async verify_firstName(expectedFirstName: string): Promise<this> {
    await expect(this.firstNameInput).toHaveValue(expectedFirstName, {
      timeout: 15000,
    });
    return this;
  }
}
