import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly path = '/web/index.php/auth/requestPasswordResetCode';

  private resetPasswordHeading = this.page.locator(
    '//h6[normalize-space()="Reset Password"]',
  );
  private usernameInput = this.page.locator('//input[@name="username"]');
  private resetPasswordButton = this.page.locator(
    '//button[contains(normalize-space(),"Reset Password")]',
  );
  private cancelButton = this.page.locator(
    '//button[contains(normalize-space(),"Cancel")]',
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates directly to the reset-password page.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Returns to the login page via Cancel.
   * @returns this for chaining
   */
  async step_cancel(): Promise<this> {
    await this.cancelButton.click();
    await this.page.waitForURL(/\/auth\/login/, { timeout: 15000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the reset-password form is shown.
   * @returns this for chaining
   */
  async verify_onResetPasswordPage(): Promise<this> {
    await expect(this.page).toHaveURL(/requestPasswordResetCode/, {
      timeout: 15000,
    });
    await this.resetPasswordHeading.waitFor({ state: 'visible' });
    await this.usernameInput.waitFor({ state: 'visible' });
    return this;
  }

  /**
   * Verifies the reset-password heading text.
   * @param expectedHeading - Expected heading label
   * @returns this for chaining
   */
  async verify_resetPasswordHeading(expectedHeading: string): Promise<this> {
    expect((await this.resetPasswordHeading.innerText()).trim()).toBe(
      expectedHeading,
    );
    return this;
  }
}
