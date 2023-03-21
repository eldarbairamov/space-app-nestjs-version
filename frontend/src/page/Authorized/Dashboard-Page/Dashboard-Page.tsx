import { useState } from "react";

import { DashboardAvatar, DashboardGreeting, MomentCount, NoteCount, PlanCount, Modal, Loader } from "@src/component";
import { Switch } from "antd";
import { getUserService } from "@src/service";
import { AuthorizedRouter } from "@src/router";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Dashboard-Page.module.scss";
import settingsDark from "/settings-dark.svg";
import settingsLight from "/settings-light.svg";

export function DashboardPage() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const editProfile = () => AuthorizedRouter.navigate("/settings");

   const dispatch = useAppDispatch();

   const { isLoading } = getUserService();

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   return (
      <motion.div className={ style.DashboardPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         <div className={ style.top }>
            <DashboardAvatar/>

            <DashboardGreeting/>

            <Switch className={ style.switch }
                    defaultChecked={ isDark }
                    size={ "small" }
                    onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

            <img className={ style.settings }
                 src={ isDark ? settingsLight : settingsDark }
                 alt="settings"
                 onClick={ editProfile }
                 style={ { width: "30px" } }/>

         </div>

         <div className={ style.bottom }>
            <NoteCount/>
            <PlanCount/>
            <MomentCount/>
         </div>


         <Modal isOpen={ isLoading } onClose={ toggleModal } isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>
   );
}
