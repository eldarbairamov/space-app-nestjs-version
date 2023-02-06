import React, { FC, useEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";
import { storageService } from "./services";

export const App: FC = () => {
   const isLogin = storageService.getAccessToken();

   useEffect(() => {
      if (isLogin) import ("./style/app.scss");
      else import("./style/welcome.scss");

   }, [ isLogin ]);

   return (
      <> <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/> </>
   );
};
