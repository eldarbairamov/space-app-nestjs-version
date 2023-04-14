import { PlanHeader, PlanList, Modal, Loader } from "@src/component";
import { getPlansService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useModal } from "@src/hook";
import { PLANS_COLOR } from "@src/constant";

import style from "./Plans-Page.module.scss";

export function PlansPage() {
   const { isLoading } = getPlansService();

   const { toggleModal } = useModal(isLoading);

   return (
      <>
         { !isLoading &&
            <motion.div className={ style.PlansPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>
               <PlanHeader/>
               <PlanList/>

            </motion.div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={PLANS_COLOR}/>
         </Modal>
      </>
   );
}
