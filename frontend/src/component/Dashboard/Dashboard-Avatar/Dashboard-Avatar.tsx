import { useAppSelector } from "@src/hook";
import { configuration } from "@src/config/configuration";

import user from "/user.png";
import style from "./Dashboard-Avatar.module.scss";

export function DashboardAvatar() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <div className={ style.DashboardAvatar }>

         { avatar
            ?
            <div className={ style.avatar }>
               <img src={ `${ configuration.API_URL }/${ avatar }` } alt="avatar"/>
            </div>
            :
            <img className={ style.no_avatar } src={ user } alt="no avatar"/>
         }

      </div>
   );
}
