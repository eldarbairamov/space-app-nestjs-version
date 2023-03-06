import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout";
import { DashboardPage, TasksPage, MomentsPage, NotesPage, PlansPage, ProfileSettingsPage, MomentItemPage } from "../page";
import { EmailConfirmationMessage, ErrorMessage, ChangePasswordForm, ProfileUpdateForm, ChangeEmailMessage, ChangePasswordMessage, ChangeEmailForm } from "../component";
import { NoteActivePage } from "../page/App-Router/Note-Active-Page/Note-Active-Page";

export const AppRouter = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorMessage/>,
      children: [
         {
            index: true,
            element: <Navigate to={ "dashboard" }/>,
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
            element: <ChangeEmailMessage/>,
         },
         {
            path: "email_confirmation/:token",
            element: <EmailConfirmationMessage/>,
         },
         {
            path: "password_update/message",
            element: <ChangePasswordMessage/>,
         },
         {
            path: "notes",
            element: <NotesPage/>,
         },
         {
            path: "notes/edit",
            element: <NoteActivePage/>,
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
         {
            path: "error",
            element: <ErrorMessage/>,
         },
      ],
   },
]);
