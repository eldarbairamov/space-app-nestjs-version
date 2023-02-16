import { createBrowserRouter } from "react-router-dom";
import { ActivationPage, ForgotPasswordPage, LoginPage, RegistrationPage, ResetPasswordPage, LogoPage } from "../page";
import { ErrorMessage, ForgotPasswordMessage, RegistrationSuccessMessage, UnauthorizedMessage } from "../component";
import { EmailConfirmationMessage } from "../component/Message/Email-Confirmation-Message (non-auth)/Email-Confirmation-Message";

export const WelcomeRouter = createBrowserRouter([
   {
      path: "*",
      errorElement: <ErrorMessage/>,
   },
   {
      path: "/",
      element: <LogoPage/>,
   },
   {
      path: '/unauthorized',
      element: <UnauthorizedMessage/>
   },
   {
      path: "/registration",
      element: <RegistrationPage/>,
   },
   {
      path: "/registration_success",
      element: <RegistrationSuccessMessage/>,
   },
   {
      path: '/forgot_password_message',
      element: <ForgotPasswordMessage/>
   },
   {
      path: "/login",
      element: <LoginPage/>,
   },
   {
      path: "/password_forgot",
      element: <ForgotPasswordPage/>,
   },
   {
      path: "/password_reset/:token",
      element: <ResetPasswordPage/>,
   },
   {
      path: "/activation",
      element: <ActivationPage/>,
   },
   {
      path: "email_confirmation/:token",
      element: <EmailConfirmationMessage/>,
   },
]);