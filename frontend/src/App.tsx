import React, { FC } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "./router";
import { storageService } from "./service";
import { ConfigProvider } from "antd";
import { useTheme } from "./hook/use-theme.hook";

export const App: FC = () => {
   const isLogin = storageService.getAccessToken();

   const { theme } = useTheme();

   return (
      <ConfigProvider theme={ theme }>
         <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/>
      </ConfigProvider>
   );
};
