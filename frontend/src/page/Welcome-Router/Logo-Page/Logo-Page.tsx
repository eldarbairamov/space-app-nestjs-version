import { useEffect } from "react";

import { WelcomeLogo } from "@src/component";
import { useLocation } from "react-router";
import { WelcomeRouter } from "@src/router";
import { motion } from "framer-motion";
import { p1, p2, p3, p4, logo } from "@src/animation";
import { FloatButton, Switch } from "antd";
import { appActions } from "@src/redux/slice";
import { useAppDispatch, useAppSelector } from "@src/hook";

import style from "./Logo-Page.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";

export function LogoPage() {
   const location = useLocation();

   useEffect(() => {
      if (location.state && location.state.status === "unauthorized") WelcomeRouter.navigate("/unauthorized", { replace: true });
      if (location.state && location.state.status === "change password") WelcomeRouter.navigate("/login", { replace: true });
   }, []);

   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   return (
      <div className={ style.WelcomePage }>

         <motion.div variants={ logo } initial={ "initial" } animate={ "animate" }>
            <WelcomeLogo/>
         </motion.div>

         <div className={ style.description }>
            <motion.p variants={ p1 } initial={ "initial" } animate={ "animate" }>
               Твій простір.
            </motion.p>

            <motion.p variants={ p2 } initial={ "initial" } animate={ "animate" }>
               Твої спогади.
            </motion.p>

            <motion.p variants={ p3 } initial={ "initial" } animate={ "animate" }>
               Твій друг
            </motion.p>

            <motion.p variants={ p4 } initial={ "initial" } animate={ "animate" }>
               :)
            </motion.p>

         </div>

         <motion.div variants={ p4 } initial={ "initial" } animate={ "animate" }>
            <Switch className={ style.switch } defaultChecked={ isDark } size={ "small" }
                    onChange={ () => dispatch(appActions.switchTheme(!isDark)) }/>

            <FloatButton icon={ <QuestionCircleOutlined/> }
                         onClick={() => WelcomeRouter.navigate('/info')}
                         type="primary"
                         style={ { right: 24 } }/>
         </motion.div>

      </div>
   );
}
