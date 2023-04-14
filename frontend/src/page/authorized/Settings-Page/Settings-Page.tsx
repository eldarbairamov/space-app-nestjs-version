import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { AuthSettings, EditPhoto, Loader, Modal, NameSection, UserPhoto } from "@src/component";
import { useModal } from "@src/hook";
import { getUserService } from "@src/service";

import style from "./Settings-Page.module.scss";
import { DASHBOARD_COLOR } from "@src/constant/color.constant";

export function SettingsPage() {
   const { isLoading } = getUserService();

   const { toggleModal } = useModal(isLoading);

   return (
      <>
         { !isLoading &&
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
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={ DASHBOARD_COLOR }/>
         </Modal>
      </>
   );
}
