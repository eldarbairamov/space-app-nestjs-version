import React, { FC } from "react";

import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "@src/router";
import { storageService } from "@src/service";
import { ConfigProvider } from "antd";
import { useTheme } from "@src/hook/use-theme.hook";
import { App as AntdContext } from "antd";

export const App: FC = () => {
   const isLogin = storageService.getAccessToken();

   const { theme } = useTheme();

   return (
      <ConfigProvider theme={ theme }>
         <AntdContext>
            <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/>
         </AntdContext>
      </ConfigProvider>
   );
};
