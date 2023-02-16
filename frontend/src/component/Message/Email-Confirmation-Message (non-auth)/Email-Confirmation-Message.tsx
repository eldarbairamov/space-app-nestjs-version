import React, { FC } from "react";

import { message, Result } from "antd";
import { v4 } from "uuid";
import { AppRouter } from "../../../router";
import { useSearchParams } from "react-router-dom";
import { emailConfirmationService } from "../../../service";

import style from "./Email-Confirmation-Message.module.scss";

export const EmailConfirmationMessage: FC = () => {
   const [ searchParams ] = useSearchParams();
   const confirmationToken = searchParams.get("token");

   const [ messageApi, contextHolder ] = message.useMessage();

   const { isSuccess } = emailConfirmationService(messageApi, confirmationToken!);

   return (
      <div className={ style.EmailConfirmationMessage }>
         { contextHolder }

         { isSuccess &&
            <Result
               className={ style.message }
               status="success"
               title="Ви успішно оновили адресу електронної пошти"
               subTitle="Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані"
               extra={ [ <button key={ v4() } onClick={ () => AppRouter.navigate("/login", {replace: true}) }>Перейти</button> ] }
            />
         }

         { !isSuccess &&
            <Result
               className={ style.message }
               status="404"
               title="Упс.."
               subTitle="Посилання більше не актуальне"
            />
         }

      </div>
   );
};