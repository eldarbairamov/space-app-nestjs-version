import React, { FC } from "react";

import style from './Error-Message.module.scss'
import { Result } from "antd";
import { useRouteError } from "react-router-dom";

export const ErrorMessage:FC = () => {
   const error = useRouteError();
   console.error(error);

   return (
      <div>
         <div className={style.ErrorMessage}>
            <Result
               status="500"
               title="Ой.."
               subTitle="Неочікувана помилка.."
            />
         </div>
      </div>
   );
};
