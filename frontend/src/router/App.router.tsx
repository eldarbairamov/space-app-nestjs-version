import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { MainLayout } from "../layout";
import { DashboardPage, TasksPage, MomentsPage, NotesPage, PlansPage, ProfileSettingsPage, EmailConfirmationPage, ChangePassMessagePage } from "../page";
import { EmailUpdateForm, PasswordUpdateForm, ProfileUpdateForm } from "../component";

function ErrorBoundary() {
   const error = useRouteError();
   console.error(error);

   return <Navigate to={ "/" }/>;
}

export const AppRouter = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout/>,
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
            path: "email_confirmation/:token",
            element: <EmailConfirmationPage/>,
         },
         {
            path: "change_password/message",
            element: <ChangePassMessagePage/>,
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
            path: "*",
            element: <Navigate to={ "/" }/>,
         },
      ],
   },
   { errorElement: <ErrorBoundary/> },
]);
