import { useEffect } from "react";

import { Result } from "antd";
import { useRouteError } from "react-router-dom";
import { storageService } from "@src/service";
import { WelcomeRouter } from "@src/router";

import style from "./Error-Message.module.scss";

export function ErrorMessage() {
   const error = useRouteError() as Error;
   const isLogin = storageService.getAccessToken();

   useEffect(() => {
      if (!isLogin) WelcomeRouter.navigate("/");
   }, [ isLogin ]);

   return (
      <div>
         <div className={ style.ErrorMessage }>
            <Result
               className={style.message}
               status="500"
               title="Ой.."
               subTitle={ error.message ? `Несподівана помилка: ${ error.message }` : "Несподівана помилка" }
            />
         </div>
      </div>
   );
}
