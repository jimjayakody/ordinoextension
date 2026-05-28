import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';

  private dashboardNavLink = this.page.locator(
    '//aside//nav//a[normalize-space()="Dashboard"]',
  );

  constructor(page: Page) {
    super(page);
  }

  /**
   * Verifies the browser is on the dashboard route with nav visible.
   * @returns this for chaining
   */
  async verify_onDashboard(): Promise<this> {
    await expect(this.page).toHaveURL(/\/dashboard\//, { timeout: 15000 });
    await this.dashboardNavLink.waitFor({ state: 'visible', timeout: 15000 });
    return this;
  }

  /**
   * Verifies the document title contains the expected text.
   * @param expectedTitle - Substring expected in the page title
   * @returns this for chaining
   */
  async verify_pageTitle(expectedTitle: string): Promise<this> {
    expect(await this.getTitle()).toContain(expectedTitle);
    return this;
  }
}
