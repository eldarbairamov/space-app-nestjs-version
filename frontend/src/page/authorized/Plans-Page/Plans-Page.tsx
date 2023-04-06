import { PlanHeader, PlanList, Modal, Loader } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector, useModal } from "@src/hook";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const { isLoading } = useAppSelector(state => state.planReducer)

   const { toggleModal } = useModal(isLoading)

   getPlansService();

   return (
      <motion.div className={ style.PlansPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>
         <PlanHeader/>
         <PlanList/>

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>
      </motion.div>
   );
}
