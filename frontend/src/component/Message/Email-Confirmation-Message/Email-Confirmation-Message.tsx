import React, { FC } from "react";

import { useSearchParams } from "react-router-dom";
import { message, Result } from "antd";
import { AppRouter } from "../../../router";
import { v4 } from "uuid";
import emailConfirmationService from "../../../service/user/email-confirmation.service";

import style from "./Email-Confirmation-Message.module.scss";

export const EmailConfirmationMessage: FC = () => {
   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const [ messageApi, contextHolder ] = message.useMessage();

   emailConfirmationService(messageApi, confirmationToken!);

   return (
      <>
         { contextHolder }

         <div className={ style.EmailConfirmationMessage }>
            <Result
               className={ style.result }
               status="success"
               title="Ви успішно оновили адресу електронної пошти."
               subTitle="Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані."
               extra={ [ <button key={v4()} onClick={ () => AppRouter.navigate("/login") }>Перейти</button> ] }
            />
         </div>

      </>
   );
};
