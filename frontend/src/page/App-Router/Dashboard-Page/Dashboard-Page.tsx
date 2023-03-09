import { DashboardAvatar, DashboardGreeting, MomentCount, NoteCount, PlanCount, Jokes } from "@src/component";
import { Switch } from "antd";
import { getUserService } from "@src/service";
import { AppRouter } from "@src/router";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Dashboard-Page.module.scss";
import settingsDark from "@src/asset/settings-dark.svg";
import settingsLight from "@src/asset/settings-light.svg";

export function DashboardPage() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const editProfile = () => AppRouter.navigate("/settings");

   const dispatch = useAppDispatch();

   getUserService();

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

            <Jokes/>

            <img className={ style.settings }
                 src={ isDark ? settingsLight : settingsDark }
                 alt="settings" onClick={ editProfile }
                 style={ { width: "30px" } }/>
         </div>

         <div className={ style.bottom }>
            <NoteCount/>
            <PlanCount/>
            <MomentCount/>
         </div>

      </motion.div>
   );
}