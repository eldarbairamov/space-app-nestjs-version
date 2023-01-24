import React, { type FC, useEffect, useLayoutEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";

export const App: FC = () => {
   const isLogin = localStorage.getItem('accessToken')

   useEffect(() => {
      if (isLogin) import ("./style/app.scss");

      if (!isLogin) import("./style/welcome.scss");

   }, [ isLogin ]);

   return (
      <> <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/> </>
   );
};
