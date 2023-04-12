import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { AuthSettings, EditPhoto, NameSection, UserPhoto } from "@src/component";

import style from "./Settings-Page.module.scss";

export function SettingsPage() {

   return (
      <motion.div className={ style.SettingsPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <div className={ style.left_side }>
            <UserPhoto/>
            <EditPhoto/>
            <NameSection/>
            <AuthSettings/>
         </div>

         <div id={ "right_side" }
              className={ style.right_side }>
            <Outlet/>
         </div>

      </motion.div>
   );
}
