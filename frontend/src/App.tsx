import React, { FC } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";
import { storageService } from "./service";

export const App: FC = () => {
   const isLogin = storageService.getAccessToken();

   return (
      <> <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/> </>
   );
};
