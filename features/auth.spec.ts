import { test } from '../src/config/page.config';
import {
  users,
  loginExpected as expected,
  dashboardExpected,
  forgotPasswordExpected,
} from '../src/config/page-loader';

test.describe('OrangeHRM - Auth - Login', () => {
  test('should complete login with valid admin credentials', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(dashboardExpected.labels.pageTitle);
  });

  test('should reject invalid credentials', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
  });
});

test.describe('OrangeHRM - Auth - Forgot password', () => {
  test('should open the reset password page from login', async ({
    loginPage,
    forgotPasswordPage,
  }) => {
    await loginPage.step_navigate();
    await loginPage.step_openForgotPassword();
    await forgotPasswordPage.verify_onResetPasswordPage();
    await forgotPasswordPage.verify_resetPasswordHeading(
      forgotPasswordExpected.labels.resetPasswordHeading,
    );
  });

  test('should return to login when cancel is clicked', async ({
    forgotPasswordPage,
    loginPage,
  }) => {
    await forgotPasswordPage.step_navigate();
    await forgotPasswordPage.step_cancel();
    await loginPage.verify_onLoginPage();
  });
});
