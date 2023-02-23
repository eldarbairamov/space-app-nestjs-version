import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout";
import { DashboardPage, TasksPage, MomentsPage, NotesPage, PlansPage, ProfileSettingsPage, MomentItemPage } from "../page";
import { EmailConfirmationMessage, ErrorMessage, ChangePasswordForm, ProfileUpdateForm, UpdateEmailMessage, UpdatePasswordMessage, ChangeEmailForm } from "../component";

export const AppRouter = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorMessage/>,
      children: [
         {
            index: true,
            element: <DashboardPage/>,
         },
         {
            path: "dashboard",
            element: <DashboardPage/>,
         },
         {
            path: "settings",
            element: <ProfileSettingsPage/>,
            children: [
               {
                  index: true,
                  element: <ProfileUpdateForm/>,
               },
               {
                  path: "email",
                  element: <ChangeEmailForm/>,
               },
               {
                  path: "password",
                  element: <ChangePasswordForm/>,
               },
            ],
         },
         {
            path: "email_update/message",
            element: <UpdateEmailMessage/>,
         },
         {
            path: "email_confirmation/:token",
            element: <EmailConfirmationMessage/>,
         },
         {
            path: "password_update/message",
            element: <UpdatePasswordMessage/>,
         },
         {
            path: "notes",
            element: <NotesPage/>,
         },
         {
            path: "moments",
            element: <MomentsPage/>,
         },
         {
            path: "plans",
            element: <PlansPage/>,
         },
         {
            path: "plans/:planId",
            element: <TasksPage/>,
         },
         {
            path: "moments/:momentId",
            element: <MomentItemPage/>,
         },
         {
            path: "*",
            element: <Navigate to={ "/" }/>,
         },
      ],
   },
]);
