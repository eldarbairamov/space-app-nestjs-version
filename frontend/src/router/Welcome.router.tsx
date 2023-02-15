import { createBrowserRouter, Navigate } from "react-router-dom";
import { ActivationPage, ForgotPasswordPage, LoginPage, RegistrationPage, ResetPasswordPage, LogoPage } from "../page";
import { EmailConfirmationPage } from "../page/Welcome-Router/Email-Confirmation-Page (signed-out)/Email-Confirmation-Page";
import { ErrorMessage } from "../component/Message/Error-Message/Error-Message";
import { RegistrationSuccessMessage } from "../component/Message/Registration-Success-Message/Registration-Success-Message";
import { ForgotPasswordMessage } from "../component/Message/Forgot-Password-Message/Forgot-Password-Message";
import { UnauthorizedMessage } from "../component/Message/Unauthorized-Message/Unauthorized-Message";

export const WelcomeRouter = createBrowserRouter([
   {
      path: "*",
      errorElement: <ErrorMessage/>,
      element: <Navigate to={ "/" }/>,
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
      element: <EmailConfirmationPage/>,
   },
]);