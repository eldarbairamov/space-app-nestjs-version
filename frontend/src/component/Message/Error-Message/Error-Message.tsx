import { Result } from "antd";
import { useRouteError } from "react-router-dom";

import style from "./Error-Message.module.scss";
import { UnsuccessIcon } from "@src/component/UI/Unsuccess-Icon/Unsuccess-Icon";
import { v4 } from "uuid";
import { AuthorizedRouter } from "@src/router";
import { Button } from "@src/component";
import { AuthorizedRoutesEnum } from "@src/router/authorized.type";

export function ErrorMessage() {
   const error = useRouteError() as Error;
   console.log(error);

   return (
      <div>
         <div className={ style.ErrorMessage }>
            <Result className={ style.message }
                    icon={ <UnsuccessIcon/> }
                    title={ "Ой.." }
                    subTitle={ "Несподівана помилка" }
                    extra={
                       <Button key={ v4() }
                               text={ "На головну" }
                               onClick={ () => AuthorizedRouter.navigate(AuthorizedRoutesEnum.DashboardPage, { replace: true }) }/>
                    }
            />
         </div>
      </div>
   );
}
