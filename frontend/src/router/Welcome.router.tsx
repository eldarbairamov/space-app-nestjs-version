import { createBrowserRouter, Navigate } from "react-router-dom";
import { ActivationPage, ForgotPasswordPage, LoginPage, RegistrationPage, ResetPasswordPage, LogoPage } from "../page";

export const WelcomeRouter = createBrowserRouter([
   {
      path: "/",
      element: <LogoPage/>,
   },
   {
      path: "/registration",
      element: <RegistrationPage/>,
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
      path: "*",
      element: <Navigate to={ "/" }/>,
   },
]);