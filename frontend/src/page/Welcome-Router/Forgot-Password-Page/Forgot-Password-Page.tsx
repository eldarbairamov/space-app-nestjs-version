import React from "react";

import { ForgotPasswordForm, WelcomeLogo } from "../../../component";
import { message, Switch } from "antd";
import { WelcomeRouter } from "../../../router";
import { forgotPasswordService } from "../../../service";

import style from "./Forgot-Password-Page.module.scss";
import { appActions } from "../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../hook";

export function ForgotPasswordPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { forgotPasswordFn } = forgotPasswordService(messageApi, () => WelcomeRouter.navigate("/forgot_password_message", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.ForgotPasswordPage }>
         { contextHolder }

         <WelcomeLogo/>

         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>

         <Switch className={ style.switch } defaultChecked={isDark} size={ "small" } onChange={ () => dispatch(appActions.switchTheme(!isDark))}/>

      </div>
   );
}
