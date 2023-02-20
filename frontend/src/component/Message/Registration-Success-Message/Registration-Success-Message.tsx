import React from "react";

import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import { WelcomeRouter } from "../../../router";
import { Button } from "../../../component/";

import style from "./Registration-Success-Message.module.scss";

export function RegistrationSuccessMessage() {
   return (
      <div className={ style.RegistrationSuccessMessage }>
         <Result
            className={ style.message }
            icon={ <SmileOutlined/> }
            title="Ви успішно зареєструвались"
            subTitle={ "Посилання на активацію аккаунту вже летить на вказану електронну пошту" }
            extra={
               <Button text={ "Перейти до активації" }
                       key={ v4() }
                       onClick={ () => WelcomeRouter.navigate("/activation", { replace: true }) }/>
            }
         />
      </div>
   );
}
