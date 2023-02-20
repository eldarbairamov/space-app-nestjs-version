import React from "react";

import { RegistrationForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { WelcomeRouter } from "../../../router";
import { message } from "antd";
import { registrationService } from "../../../service";

import style from "./Registration-Page.module.scss";

export function RegistrationPage() {
   const { isDesktop, isTablet } = useMatchMedia();

   const [ messageApi, contextHolder ] = message.useMessage();
   const { registrationFn } = registrationService(messageApi, () => WelcomeRouter.navigate("/registration_success", { replace: true }));

   return (
      <div className={ style.RegistrationPage }>
         { contextHolder }

         {/*{ (isDesktop || isTablet) && <WelcomeLogo/> }*/ }

         <WelcomeLogo/>

         <RegistrationForm registrationFn={ registrationFn }/>

      </div>
   );
}
