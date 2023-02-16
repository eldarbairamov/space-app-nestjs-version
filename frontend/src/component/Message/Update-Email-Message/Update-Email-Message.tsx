import React, { FC } from "react";

import { Result } from "antd";
import {v4} from "uuid";
import { AppRouter } from "../../../router";

import style from "./Update-Email-Message.module.scss";

export const UpdateEmailMessage: FC = () => {

   return (
         <div className={ style.UpdateEmailMessage }>
            <Result
               className={ style.message }
               status="success"
               title="Лист із посиланням на підтведження вже летить на вказану електронну пошту"
               extra={ [ <button key={v4()} onClick={() => AppRouter.navigate('/')}> Окей </button> ] }
            />
         </div>
   );
};
