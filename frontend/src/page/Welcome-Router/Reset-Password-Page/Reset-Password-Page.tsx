import React from "react";

import { ResetPasswordForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { resetPasswordService } from "../../../service";

import style from "./Reset-Password-Page.module.scss";

export function ResetPasswordPage() {
   const { isDesktop, isTablet } = useMatchMedia();

   const [ searchParams ] = useSearchParams();
   const resetPasswordToken = searchParams.get("token");

   const [ messageApi, contextHolder ] = message.useMessage();

   const { resetPasswordFn } = resetPasswordService(messageApi, () => WelcomeRouter.navigate("/login", { replace: true }));

   return (
      <div className={ style.ResetPasswordPage }>
         { contextHolder }

         { (isDesktop || isTablet) && <WelcomeLogo/> }

         <ResetPasswordForm resetPasswordFn={ resetPasswordFn }
                            messageApi={ messageApi }
                            resetPasswordToken={ resetPasswordToken! }/>

      </div>
   );
}
