import { MomentHeader, MomentList, Loader, Modal } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useModal } from "@src/hook";
import { MOMENTS_COLOR } from "@src/constant";

import style from "./Moment-Page.module.scss";

export function MomentsPage() {
   const { isLoading } = getMomentsService();

   const { toggleModal } = useModal(isLoading);

   const { addMomentFn } = addMomentService();

   return (
      <>
         { !isLoading &&
            <motion.div className={ style.MomentPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>

               <MomentHeader addMomentFn={ addMomentFn }/>
               <MomentList/>
            </motion.div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={MOMENTS_COLOR}/>
         </Modal>
      </>
   );
}
