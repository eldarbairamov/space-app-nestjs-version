import React from "react";

import { ActivationForm, WelcomeLogo } from "../../../component";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { activationService } from "../../../service";

import style from "./Activation-Page.module.scss";

export function ActivationPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { activationFn } = activationService(messageApi, () => WelcomeRouter.navigate("/login", { replace: true }));

   return (
      <div className={ style.ActivationPage }>
         { contextHolder }

         <WelcomeLogo/>

         <ActivationForm activationFn={ activationFn }/>

      </div>
   );
}
