import React from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { WelcomeRouter } from "../../../router";
import { message, Switch } from "antd";
import { registrationService } from "../../../service";

import style from "./Registration-Page.module.scss";
import { appActions } from "../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../hook";

export function RegistrationPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { registrationFn } = registrationService(messageApi, () => WelcomeRouter.navigate("/registration_success", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.RegistrationPage }>
         { contextHolder }

         <WelcomeLogo/>

         <RegistrationForm registrationFn={ registrationFn }/>

         <Switch className={ style.switch } defaultChecked={isDark} size={ "small" } onChange={ () => dispatch(appActions.switchTheme(!isDark))}/>

      </div>
   );
}
