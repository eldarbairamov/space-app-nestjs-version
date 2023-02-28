import React from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { WelcomeRouter } from "../../../router";
import { message } from "antd";
import { registrationService } from "../../../service";

import style from "./Registration-Page.module.scss";

export function RegistrationPage() {
   const [ messageApi, contextHolder ] = message.useMessage();
   const { registrationFn } = registrationService(messageApi, () => WelcomeRouter.navigate("/registration_success", { replace: true }));

   return (
      <div className={ style.RegistrationPage }>
         { contextHolder }

         <WelcomeLogo/>

         <RegistrationForm registrationFn={ registrationFn }/>

      </div>
   );
}
