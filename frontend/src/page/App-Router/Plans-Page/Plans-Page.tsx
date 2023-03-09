import { PlanHeader, PlanList } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   getPlansService();

   return (
      <motion.div className={ style.PlansPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         {/* Header */ }
         <PlanHeader/>

         {/* Plan list wrapper */ }
         <div className={ style.plan_list_wrapper }>
            <PlanList/>
         </div>

      </motion.div>
   );
}
