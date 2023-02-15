import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout";
import { DashboardPage, TasksPage, MomentsPage, NotesPage, PlansPage, ProfileSettingsPage, EmailConfirmationPage, UpdatePasswordMessagePage, MomentItemPage } from "../page";
import { EmailUpdateForm, PasswordUpdateForm, ProfileUpdateForm } from "../component";
import { ErrorMessage } from "../component/Message/Error-Message/Error-Message";
import { UpdateEmailMessagePage } from "../page/App-Router/Update-Email-Message-Page/Update-Email-Message";

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
                  element: <EmailUpdateForm/>,
               },
               {
                  path: "password",
                  element: <PasswordUpdateForm/>,
               },
            ],
         },
         {
            path: 'email_update/message',
            element: <UpdateEmailMessagePage/>
         },
         {
            path: "email_confirmation/:token",
            element: <EmailConfirmationPage/>,
         },
         {
            path: "password_update/message",
            element: <UpdatePasswordMessagePage/>,
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
