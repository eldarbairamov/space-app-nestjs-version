import { Result } from "antd";
import { WelcomeRouter } from "@src/router";
import { v4 } from "uuid";
import { Button } from "@src/component";

import style from "./Unauthorized-Message.module.scss";

export function UnauthorizedMessage() {
   return (
      <div className={ style.UnauthorizedMessage }>
         <Result
            className={style.message}
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
