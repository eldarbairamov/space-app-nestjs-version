import { RouterProvider } from "react-router-dom";
import { AuthorizedRouter, UnauthorizedRouter } from "@src/router";
import { storageService } from "@src/service";
import { ConfigProvider } from "antd";
import { useTheme } from "@src/hook/use-theme.hook";
import { App as AntdContext } from "antd";
import { BgPreload } from "@src/layout/Bg-Preload/Bg-Preload";

export function App() {
   const isLogin = storageService.getAccessToken();

   const { theme } = useTheme();

   return (
      <ConfigProvider theme={ theme }>
         <AntdContext>
            <RouterProvider router={ isLogin ? AuthorizedRouter : UnauthorizedRouter }/>
            <BgPreload/>
         </AntdContext>
      </ConfigProvider>
   );
}
