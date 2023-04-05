import { Result } from "antd";
import { v4 } from "uuid";
import { UnauthorizedRouter } from "@src/router";
import { logoutService } from "@src/service";
import { Button } from "@src/component";

import style from "./Change-Password-Message.module.scss";

export function ChangePasswordMessage() {
   const { logoutFn } = logoutService(() => {
      UnauthorizedRouter.navigate("/login");
      UnauthorizedRouter.navigate(0);
   });

   return (
      <div className={ style.ChangePasswordMessage }>
         <Result
            className={ style.message }
            status="success"
            title="Ви успішно оновили свій пароль"
            subTitle="Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані"
            extra={
               <Button onClick={ logoutFn }
                       text={ "Увійти" }
                       key={ v4() }/>
            }
         />

      </div>
   );
}
