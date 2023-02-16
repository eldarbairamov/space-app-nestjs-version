import React, { FC } from "react";

import { Result } from "antd";
import { useRouteError } from "react-router-dom";

import style from './Error-Message.module.scss'

export const ErrorMessage:FC = () => {
   const error = useRouteError() as Error;

   return (
      <div>
         <div className={style.ErrorMessage}>
            <Result
               status="500"
               title="Ой.."
               subTitle={ `Несподівана помилка: ${error.message}` }
            />
         </div>
      </div>
   );
};
