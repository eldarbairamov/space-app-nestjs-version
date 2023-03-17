import { useState } from "react";

import { MomentHeader, MomentList, Loader, Modal } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Page.module.scss";

export function MomentsPage() {
   const [ searchKey, setSearchKey ] = useState<string>("");

   const { isLoading } = useAppSelector(state => state.momentReducer)

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   getMomentsService(searchKey);

   const { addMomentFn } = addMomentService();

   return (
      <motion.div className={ style.MomentPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         {/* Header */ }
         <MomentHeader addMomentFn={ addMomentFn } setSearchKey={ setSearchKey }/>

         {/* Moment list wrapper */ }
         <div className={ style.moment_list_wrapper }><MomentList/></div>


         <Modal isOpen={ isLoading } onClose={ toggleModal } isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>

   )
      ;
}
