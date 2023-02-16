import React, { FC } from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { forgotPasswordService } from "../../../service";

import style from "./Forgot-Password-Page.module.scss";

export const ForgotPasswordPage: FC = () => {
   const { isDesktop, isTablet } = useMatchMedia();

   const [ messageApi, contextHolder ] = message.useMessage();

   const { forgotPasswordFn } = forgotPasswordService(messageApi, () => WelcomeRouter.navigate("/forgot_password_message", { replace: true }));

   return (
      <div className={ style.ForgotPasswordPage }>
         { contextHolder }

         { (isDesktop || isTablet) && <WelcomeLogo/> }

         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>

      </div>
   );
};
