import { RouterProvider } from "react-router-dom";
import { AppRouter, WelcomeRouter } from "@src/router";
import { storageService } from "@src/service";
import { ConfigProvider } from "antd";
import { useTheme } from "@src/hook/use-theme.hook";
import { App as AntdContext } from "antd";

import bg from "/background-light.jpeg";
import bgDark from "/background-dark.jpeg";

export function App() {
   const isLogin = storageService.getAccessToken();

   const { theme } = useTheme();

   return (
      <ConfigProvider theme={ theme }>
         <AntdContext>
            <RouterProvider router={ isLogin ? AppRouter : WelcomeRouter }/>

            {/* Bgs pre-load */}
            <div style={ { display: "none" } }>
               <img src={ bg } alt=""/>
               <img src={ bgDark } alt=""/>
            </div>

         </AntdContext>
      </ConfigProvider>
   );
}
