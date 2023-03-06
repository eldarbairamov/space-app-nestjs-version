import { useLayoutEffect } from "react";
import { useAppSelector } from "./redux.hook";
import { ThemeConfig } from "antd";

export const useTheme = () => {
   const { isDark } = useAppSelector(state => state.appReducer);

   const theme: ThemeConfig = {
      token: {
         fontSize: 15,
         colorError: "#df8281",
         colorPrimary: "#7d7d7d",
         colorSuccess: "#90be8e",
         colorText: isDark ? "whitesmoke" : "#4e4e51",
         colorTextPlaceholder: isDark ? "#acacac" : "#7d7d7d",
         colorTextBase: isDark ? "whitesmoke" : "#4e4e51",
         colorBorderSecondary: isDark ? "#4d5158" : "#dfdfdf",
         colorBgBase: isDark ? "#2d2f33" : "whitesmoke",
         colorPrimaryBg: isDark ? "#41434a" : "#dfdfdf",
      },
      components: {
         Switch: {
            colorPrimary: "#3D8DAE",
         }
      }
   };

   useLayoutEffect(() => {
      document.documentElement.setAttribute("data-dark", localStorage.getItem("isDark")! || "false");
   }, [ isDark ]);

   return { theme };
};