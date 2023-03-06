import React from "react";

import { DashboardAvatar, DashboardGreeting, MomentCount, NoteCount, PlanCount } from "../../../component";
import { message, Switch } from "antd";
import { getUserService } from "../../../service";
import { AppRouter } from "../../../router";
import "moment/locale/uk.js";
import { appActions } from "../../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { motion } from "framer-motion";
import { horizontalPresent } from "../../../animation";

import style from "./Dashboard-Page.module.scss";
import settingsDark from "../../../asset/settings-dark.svg";
import settingsLight from "../../../asset/settings-light.svg";

export function DashboardPage() {
   const [ messageApi, contextHolder ] = message.useMessage();
   const { isDark } = useAppSelector(state => state.appReducer);

   const editProfile = () => AppRouter.navigate("/settings");

   const dispatch = useAppDispatch();

   getUserService(messageApi);

   return (
      <motion.div className={ style.DashboardPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >
         { contextHolder }

         <div className={ style.top }>
            <DashboardAvatar/>

            <DashboardGreeting/>

            <img className={ style.settings }
                 src={ isDark ? settingsLight : settingsDark }
                 alt="settings" onClick={ editProfile }
                 style={ { width: "30px" } }/>

            <Switch className={ style.switch }
                    defaultChecked={ isDark }
                    size={ "small" }
                    onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>
         </div>

         <div className={ style.bottom }>
            <NoteCount/>
            <PlanCount/>
            <MomentCount/>
         </div>

      </motion.div>
   );
}