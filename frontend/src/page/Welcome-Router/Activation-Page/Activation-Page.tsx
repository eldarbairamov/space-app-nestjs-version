import { ActivationForm, WelcomeLogo } from "@src/component";
import { Switch } from "antd";
import { WelcomeRouter } from "@src/router";
import { activationService } from "@src/service";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from "./Activation-Page.module.scss";

export function ActivationPage() {
   const { activationFn } = activationService(() => WelcomeRouter.navigate("/login", { replace: true }));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.ActivationPage }>
         <WelcomeLogo/>

         <ActivationForm activationFn={ activationFn }/>

         <Switch className={ style.switch }
                 defaultChecked={ isDark }
                 size={ "small" }
                 onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

      </div>
   );
}
