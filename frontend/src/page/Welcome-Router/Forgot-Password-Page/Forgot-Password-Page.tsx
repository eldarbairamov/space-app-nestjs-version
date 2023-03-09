import { ForgotPasswordForm, WelcomeLogo } from "@src/component";
import { Switch } from "antd";
import { WelcomeRouter } from "@src/router";
import { forgotPasswordService } from "@src/service";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from "./Forgot-Password-Page.module.scss";

export function ForgotPasswordPage() {
   const { forgotPasswordFn } = forgotPasswordService(() => WelcomeRouter.navigate("/forgot_password_message", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.ForgotPasswordPage }>
         <WelcomeLogo/>

         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>

         <Switch className={ style.switch } defaultChecked={ isDark } size={ "small" }
                 onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

      </div>
   );
}
