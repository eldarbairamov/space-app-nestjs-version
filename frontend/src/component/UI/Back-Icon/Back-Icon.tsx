import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@src/hook";

import styles from "./Back-Icon.module.scss";
import backLight from "/back-light.svg";
import backDark from "/back-dark.svg";

export function BackIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const navigate = useNavigate();

   return (
      <img className={ styles.BackIcon } src={ isDark ? backLight : backDark }
           alt={ "back" }
           onClick={ () => navigate(-1) }
           style={ { width: "30px" } }/>
   );
}
