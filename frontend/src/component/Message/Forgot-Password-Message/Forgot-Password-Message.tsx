import React from "react";

import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import style from "./Forgot-Password-Message.module.scss";
import { Button } from "../../UI/Button/Button";
import { v4 } from "uuid";
import { AppRouter } from "../../../router";

export function ForgotPasswordMessage() {
   return (
      <div className={ style.ForgotPasswordMessage }>
         <Result
            className={ style.message }
            icon={ <SmileOutlined/> }
            title="Ура!"
            subTitle="Лист із подальшою інструкцією вже летить на вказану електронну пошту"
            extra={
               <Button key={ v4() }
                       text={ "Окей" }
                       onClick={ () => AppRouter.navigate("/login", { replace: true }) }/>
            }
         />
      </div>
   );
}
