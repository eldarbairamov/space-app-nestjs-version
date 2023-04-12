import { Result } from "antd";
import { UnauthorizedRouter, UnauthorizedRoutesEnum } from "@src/router";
import { v4 } from "uuid";
import { Button, LockIcon } from "@src/component";

import style from "./Unauthorized-Message.module.scss";

export function UnauthorizedMessage() {
   return (
      <div className={ style.UnauthorizedMessage }>
         <Result className={ style.message }
                 icon={ <LockIcon/> }
                 title={ "Упс.." }
                 subTitle={ "Ви не авторизовані" }
                 extra={
                    <Button key={ v4() }
                            text={ "Увійти" }
                            onClick={ () => UnauthorizedRouter.navigate(UnauthorizedRoutesEnum.LoginPage, { replace: true }) }/>
                 }
         />
      </div>
   );
}
