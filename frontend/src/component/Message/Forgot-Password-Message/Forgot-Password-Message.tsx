import React, { FC } from "react";

import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { AppRouter } from "../../../router";

import style from "./Forgot-Password-Message.module.scss";

export const ForgotPasswordMessage: FC = () => {
   return (
      <div className={ style.ForgotPasswordMessage }>
         <Result
            className={ style.result }
            icon={ <SmileOutlined/> }
            title="Лист із посиланням вже летить на вказану електронну пошту"
            extra={
               <button key={v4()} onClick={ () => AppRouter.navigate("/login", { replace: true }) }> Перейти до логінації </button>
            }
         />
      </div>
   );
};
