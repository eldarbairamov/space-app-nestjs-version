import { useState } from "react";

import { MomentHeader, MomentList, Loader, Modal } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Page.module.scss";

export function MomentsPage() {
   const { isLoading } = useAppSelector(state => state.momentReducer)

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

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
