import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type LoginCredentials = { username: string; password: string };

export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';

  private usernameInput = this.page.locator('//input[@name="username"]');
  private passwordInput = this.page.locator('//input[@name="password"]');
  private loginButton = this.page.locator('//button[@type="submit"]');
  private errorMessage = this.page.locator('//div[@role="alert"]');
  private forgotPasswordLink = this.page.locator(
    '//div[contains(@class,"orangehrm-login-forgot")]',
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the login page and waits for it to load.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Fills credentials and submits the login form.
   * @param credentials - Username + password pair
   * @returns this for chaining
   */
  async step_login(credentials: LoginCredentials): Promise<this> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
    await this.page.waitForURL(/\/(dashboard|auth\/login)/, { timeout: 15000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the error alert contains the expected text.
   * @param expectedText - Substring expected in the error message
   * @returns this for chaining
   */
  async verify_errorMessage(expectedText: string): Promise<this> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 15000 });
    expect((await this.errorMessage.innerText()).trim()).toContain(expectedText);
    return this;
  }

  /**
   * Opens the forgot-password flow from the login screen.
   * @returns this for chaining
   */
  async step_openForgotPassword(): Promise<this> {
    await this.forgotPasswordLink.click();
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Verifies the login page is displayed.
   * @returns this for chaining
   */
  async verify_onLoginPage(): Promise<this> {
    await expect(this.page).toHaveURL(/\/auth\/login/, { timeout: 15000 });
    await this.usernameInput.waitFor({ state: 'visible' });
    return this;
  }
}
