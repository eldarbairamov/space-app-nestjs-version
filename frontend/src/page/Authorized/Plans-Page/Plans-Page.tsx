import { useState } from "react";

import { PlanHeader, PlanList, Modal, Loader } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const { isLoading } = useAppSelector(state => state.planReducer)

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

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

         {/* Modal window */}
         <Modal isOpen={ isLoading } onClose={ toggleModal } isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>
   );
}