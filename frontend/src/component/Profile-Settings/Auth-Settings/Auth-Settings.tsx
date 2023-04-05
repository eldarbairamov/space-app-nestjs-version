import { scrollToElement } from "@src/helper";
import { AuthorizedRouter } from "@src/router";

import style from './Auth-Settings.module.scss'

export function AuthSettings() {
   return (
      <div className={ style.AuthSettings }>
         <p onClick={ () => {
            scrollToElement();
            AuthorizedRouter.navigate("/settings/password");
         } }>
            Змінити пароль
         </p>

         <p onClick={ () => {
            scrollToElement();
            AuthorizedRouter.navigate("/settings/email");
         } }>
            Змінити електронну пошту
         </p>
      </div>
   )
}
