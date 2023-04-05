import { useState } from "react";

import { DashboardAvatar, DashboardGreeting, MomentCount, NoteCount, PlanCount, Modal, Loader, SwitchButton, SettingsIcon } from "@src/component";
import { getUserService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Dashboard-Page.module.scss";

export function DashboardPage() {
   const { isLoading } = getUserService();

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   return (
      <motion.div className={ style.DashboardPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <div className={ style.top }>
            <DashboardAvatar/>
            <DashboardGreeting/>
            <SwitchButton/>
            <SettingsIcon/>
         </div>

         <div className={ style.bottom }>
            <NoteCount/>
            <PlanCount/>
            <MomentCount/>
         </div>

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>
   );
}
