import { Divider } from "antd";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Count.module.scss";

export function MomentCount() {
   const { momentsCount } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.MomentCount }>
         <Divider> Моменти </Divider>
         <p> { momentsCount } </p>
      </div>
   );
}
