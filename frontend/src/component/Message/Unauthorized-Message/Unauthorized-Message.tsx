import React, { FC } from "react";

import { Result } from "antd";
import { WelcomeRouter } from "../../../router";
import { v4 } from "uuid";

import style from "./Unauthorized-Message.module.scss";

export const UnauthorizedMessage: FC = () => {

   return (
      <div>
         <div className={ style.UnauthorizedMessage }>
            <Result
               status="403"
               title="Упс.."
               subTitle="Ви не авторизовані."
               extra={ <button key={ v4() } onClick={ () => WelcomeRouter.navigate("/login") }>Увійти</button> }
            />
         </div>
      </div>
   );
};
