import { LoginForm, SwitchButton, WelcomeLogo } from "@src/component";
import { AuthorizedRouter } from "@src/router";
import { loginService } from "@src/service";

import style from "./Login-Page.module.scss";

export function LoginPage() {
   const { loginFn } = loginService(() => AuthorizedRouter.navigate('/'));

   return (
      <div className={ style.LoginPage }>
         <WelcomeLogo/>
         <LoginForm loginFn={ loginFn }/>
         <SwitchButton/>
      </div>
   );
}
