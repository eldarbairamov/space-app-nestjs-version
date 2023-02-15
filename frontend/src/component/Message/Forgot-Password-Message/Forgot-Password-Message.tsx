import React, { FC } from "react";

import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import style from "./Forgot-Password-Message.module.scss";

export const ForgotPasswordMessage: FC = () => {
   const navigate = useNavigate();

   return (
      <div className={ style.ForgotPasswordMessage }>
         <Result
            className={ style.result }
            icon={ <SmileOutlined/> }
            title="Лист із посиланням вже летить на вказану електронну пошту"
            extra={
               <button key={v4()} onClick={ () => navigate("/login", { replace: true }) }> Перейти до логінації </button>
            }
         />
      </div>
   );
};
