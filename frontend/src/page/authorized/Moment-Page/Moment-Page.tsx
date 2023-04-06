import { MomentHeader, MomentList, Loader, Modal } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector, useModal } from "@src/hook";

import style from "./Moment-Page.module.scss";

export function MomentsPage() {
   const { isLoading } = useAppSelector(state => state.momentReducer)

   const { toggleModal } = useModal(isLoading)

   getMomentsService();

   const { addMomentFn } = addMomentService();

   return (
      <motion.div className={ style.MomentPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <MomentHeader addMomentFn={ addMomentFn }/>
         <MomentList/>

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>

   )
}
