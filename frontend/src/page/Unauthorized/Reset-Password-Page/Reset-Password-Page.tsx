import { ResetPasswordForm, WelcomeLogo } from "@src/component";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { useSearchParams } from "react-router-dom";
import { Switch } from "antd";
import { UnauthorizedRouter } from "@src/router";
import { resetPasswordService } from "@src/service";
import { appActions } from "@src/redux/slice";

import style from "./Reset-Password-Page.module.scss";

export function ResetPasswordPage() {
   const [ searchParams ] = useSearchParams();
   const resetPasswordToken = searchParams.get("token");

   const { resetPasswordFn } = resetPasswordService(() => UnauthorizedRouter.navigate("/login", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.ResetPasswordPage }>
         <WelcomeLogo/>

         <ResetPasswordForm resetPasswordFn={ resetPasswordFn }
                            resetPasswordToken={ resetPasswordToken! }/>

         <Switch className={ style.switch } defaultChecked={ isDark } size={ "small" }
                 onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

      </div>
   );
}
