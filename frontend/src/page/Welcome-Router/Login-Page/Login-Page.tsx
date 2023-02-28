import React from "react";

import { LoginForm, WelcomeLogo } from "../../../component";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { loginService } from "../../../service";

import style from "./Login-Page.module.scss";

export function LoginPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { loginFn } = loginService(messageApi, () => WelcomeRouter.navigate(0));

   return (
      <div className={ style.LoginPage }>
         { contextHolder }

         <WelcomeLogo/>

         <LoginForm loginFn={ loginFn }/>

      </div>
   );
}
