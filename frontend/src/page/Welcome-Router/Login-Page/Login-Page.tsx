import React from "react";

import { LoginForm, WelcomeLogo } from "../../../component";
import { message, Switch } from "antd";
import { WelcomeRouter } from "../../../router";
import { loginService } from "../../../service";
import { appActions } from "../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../hook";

import style from "./Login-Page.module.scss";

export function LoginPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { loginFn } = loginService(messageApi, () => WelcomeRouter.navigate(0));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.LoginPage }>
         { contextHolder }

         <WelcomeLogo/>

         <LoginForm loginFn={ loginFn }/>

         <Switch className={ style.switch } defaultChecked={isDark} size={ "small" } onChange={ () => dispatch(appActions.switchTheme(!isDark))}/>

      </div>
   );
}
