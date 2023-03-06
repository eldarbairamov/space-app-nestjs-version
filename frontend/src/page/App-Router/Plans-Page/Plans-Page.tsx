import React from "react";

import { PlanHeader, PlanList } from "../../../component";
import { message } from "antd";
import { getPlansService } from "../../../service";
import { motion } from "framer-motion";
import { horizontalPresent } from "../../../animation";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const [ messageApi, contextHolder ] = message.useMessage();

   getPlansService(messageApi);

   return (
      <motion.div className={ style.PlansPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >
         { contextHolder }

         {/* Header */ }
         <PlanHeader/>

         {/* Plan list wrapper */ }
         <div className={ style.plan_list_wrapper }>
            <PlanList/>
         </div>

      </motion.div>
   );
}
