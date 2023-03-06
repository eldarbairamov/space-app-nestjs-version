import React from "react";

import { ActivationForm, WelcomeLogo } from "../../../component";
import { message, Switch } from "antd";
import { WelcomeRouter } from "../../../router";
import { activationService } from "../../../service";

import style from "./Activation-Page.module.scss";
import { appActions } from "../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../hook";

export function ActivationPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { activationFn } = activationService(messageApi, () => WelcomeRouter.navigate("/login", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.ActivationPage }>
         { contextHolder }

         <WelcomeLogo/>

         <ActivationForm activationFn={ activationFn }/>
         <Switch className={ style.switch } defaultChecked={isDark} size={ "small" } onChange={ () => dispatch(appActions.switchTheme(!isDark))}/>


      </div>
   );
}
