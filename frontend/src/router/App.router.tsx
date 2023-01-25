import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layout";
import {
   DashboardPage,
   MomentsPage,
   NotesPage,
   PlansPage,
   ProfileSettingsPage,
   EmailConfirmationPage,
   ChangePassMessagePage,
} from "../page";
import { EmailUpdateForm, PasswordUpdateForm, ProfileUpdateForm } from "../component";
import { PlansItemPage } from "../page/App-Router/Plans-Item-Page/Plans-Item-Page";

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
            element: <PlansItemPage/>,
         },
         {
            path: "*",
            element: <Navigate to={ "/" }/>,
         },
      ],
   },
]);