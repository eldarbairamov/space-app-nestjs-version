import { Divider } from "antd";
import { useAppSelector } from "@src/hook";

import style from "./Plan-Count.module.scss";

export function PlanCount() {
   const { plansCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.PlanCount }>
         <Divider> Плани </Divider>
         <p> { plansCount } </p>
      </div>
   );
}
