import { useAppSelector } from "@src/hook";

import style from "./Dashboard-Greeting.module.scss";

export function DashboardGreeting() {
   const { username } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardGreeting }>
         <span> Привіт, </span> { username ? username : "завантажую..." }
         <span> Ну, як ти? </span>
      </div>
   );
}
