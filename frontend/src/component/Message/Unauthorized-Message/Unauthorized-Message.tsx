import React from "react";

import { Result } from "antd";
import { WelcomeRouter } from "../../../router";
import { v4 } from "uuid";
import { Button } from "../../../component/";

import style from "./Unauthorized-Message.module.scss";

export function UnauthorizedMessage() {
   return (
      <div className={ style.UnauthorizedMessage }>
         <Result
            status="403"
            title="Упс.."
            subTitle="Ви не авторизовані."
            extra={
               <Button key={ v4() } text={ "Увійти" } onClick={ () => WelcomeRouter.navigate("/login") }/>
            }
         />
      </div>
   );
}
