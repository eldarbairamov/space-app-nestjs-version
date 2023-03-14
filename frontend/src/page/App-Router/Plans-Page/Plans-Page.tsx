import { PlanHeader, PlanList } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Plans-Page.module.scss";
import { Loader } from "@src/component/UI/Loader/Loader";

export function PlansPage() {
   const { isLoading } = useAppSelector(state => state.planReducer)

   getPlansService();

   return (
      <motion.div className={ style.PlansPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >
         { isLoading ? <Loader/> :
            <>
               {/* Header */ }
               <PlanHeader/>

               {/* Plan list wrapper */ }
               <div className={ style.plan_list_wrapper }>
                  <PlanList/>
               </div>
            </> }

      </motion.div>
   );
}
