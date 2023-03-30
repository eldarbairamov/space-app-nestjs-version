import { LoginForm, WelcomeLogo } from "@src/component";
import { Switch } from "antd";
import { AuthorizedRouter } from "@src/router";
import { loginService } from "@src/service";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from "./Login-Page.module.scss";

export function LoginPage() {
   const { loginFn } = loginService(() => AuthorizedRouter.navigate('/'));

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.LoginPage }>
         <WelcomeLogo/>

         <LoginForm loginFn={ loginFn }/>

         <Switch className={ style.switch } defaultChecked={ isDark } size={ "small" }
                 onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

      </div>
   );
}
