import { Result } from "antd";
import { useRouteError } from "react-router-dom";


import style from "./Error-Message.module.scss";

export function ErrorMessage() {
   const error = useRouteError() as Error;

   return (
      <div>
         <div className={ style.ErrorMessage }>
            <Result
               className={style.message}
               status="500"
               title="Ой.."
               subTitle={ error.message ? `Несподівана помилка: ${ error.message }` : "Несподівана помилка" }
            />
         </div>
      </div>
   );
}
