import React, { type FC, useLayoutEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";
import { storageService } from "./services/storage.service";

export const App: FC = () => {
   const isLogin = storageService.getAccessToken()

   useLayoutEffect(() => {
      if (isLogin) import ("./style/app.scss");

      if (!isLogin) import("./style/welcome.scss");

   }, [ isLogin ]);

   return (
      <> <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/> </>
   );
};
