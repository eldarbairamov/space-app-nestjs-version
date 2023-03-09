import { RegistrationForm, WelcomeLogo } from "@src/component";
import { WelcomeRouter } from "@src/router";
import { Switch } from "antd";
import { registrationService } from "@src/service";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from "./Registration-Page.module.scss";

export function RegistrationPage() {
   const { registrationFn } = registrationService(() => WelcomeRouter.navigate("/registration_success", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.RegistrationPage }>
         <WelcomeLogo/>

         <RegistrationForm registrationFn={ registrationFn }/>

         <Switch className={ style.switch }
                 defaultChecked={ isDark }
                 size={ "small" }
                 onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

      </div>
   );
}
