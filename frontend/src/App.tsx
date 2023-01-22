import React, { type FC, useEffect } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";
import { useAppSelector } from "./hook/redux.hook";

export const App: FC = () => {
   const { isLogin } = useAppSelector(state => state.authReducer);

   useEffect(() => {
      if (isLogin) import ("./style/app.scss");

      if (!isLogin) import("./style/welcome.scss");

   }, [ isLogin ]);


   return (
      <>
         <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/>
      </>
   );
};
