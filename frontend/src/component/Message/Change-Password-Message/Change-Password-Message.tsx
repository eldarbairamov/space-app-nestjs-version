import React from "react";

import { message, Result } from "antd";
import { v4 } from "uuid";
import { AppRouter } from "../../../router";
import { logoutService } from "../../../service";
import { Button } from "../../../component";

import style from "./Change-Password-Message.module.scss";

export function ChangePasswordMessage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { logoutFn } = logoutService(messageApi, () => {
      AppRouter.navigate("/", { state: { status: "change password" }, replace: true });
      AppRouter.navigate(0);
   });

   return (
      <div className={ style.ChangePasswordMessage }>
         { contextHolder }

         <Result
            className={ style.message }
            status="success"
            title="Ви успішно оновили свій пароль"
            subTitle="Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані"
            extra={
               <Button onClick={ logoutFn } text={ "Увійти" } key={ v4() }/>
            }
         />

      </div>
   );
}