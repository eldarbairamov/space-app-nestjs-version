import React, { FC } from "react";

import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { WelcomeRouter } from "../../../router";

import style from "./Registration-Success-Message.module.scss";

export const RegistrationSuccessMessage: FC = () => {
   return (
      <div className={ style.RegistrationSuccessMessage }>
         <Result
            className={ style.result }
            icon={ <SmileOutlined/> }
            title="Ви успішно зареєструвались. Посилання на активацію аккаунту вже летить на вказану електронну пошту."
            extra={
               <button key={v4()} onClick={ () => WelcomeRouter.navigate("/activation", { replace: true }) }> Перейти до активації </button>
            }
         />
      </div>
   );
};
