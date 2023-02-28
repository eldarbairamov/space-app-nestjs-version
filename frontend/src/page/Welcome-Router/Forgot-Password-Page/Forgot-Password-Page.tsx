import React from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { forgotPasswordService } from "../../../service";

import style from "./Forgot-Password-Page.module.scss";

export function ForgotPasswordPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { forgotPasswordFn } = forgotPasswordService(messageApi, () => WelcomeRouter.navigate("/forgot_password_message", { replace: true }));

   return (
      <div className={ style.ForgotPasswordPage }>
         { contextHolder }

         <WelcomeLogo/>

         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>

      </div>
   );
}
