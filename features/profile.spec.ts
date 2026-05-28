import { test } from '../src/config/page.config';
import { users, profileExpected as expected } from '../src/config/page-loader';

test.describe('OrangeHRM - Profile - About me', () => {
  test('should show personal details on My Info', async ({
    loginPage,
    dashboardPage,
    aboutMePage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await aboutMePage.step_openFromSidebar();
    await aboutMePage.verify_onAboutMePage();
    await aboutMePage.verify_displayName(expected.profile.displayName);
    await aboutMePage.verify_personalDetailsHeading(
      expected.labels.personalDetailsHeading,
    );
  });

  test('should display employee full name fields', async ({
    loginPage,
    aboutMePage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await aboutMePage.step_openFromSidebar();
    await aboutMePage.verify_employeeFullNameLabel(
      expected.labels.employeeFullNameLabel,
    );
    await aboutMePage.verify_firstName(expected.profile.firstName);
  });
});
