import { useState } from "react";

import { useParams } from "react-router-dom";
import { IMoment } from "@src/interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { getMomentService } from "@src/service";
import { motion } from "framer-motion";
import { DateAndLocation, Loader, Modal, Photo, SaveAndDelete, Tag, Title } from "@src/component";
import { momentActions } from "@src/redux/slice";

import style from "./Moment-Active-Page.module.scss";

export function MomentActivePage() {
   const { momentId } = useParams<{ momentId: IMoment["id"] }>();

   const { activeMoment, isLoading } = useAppSelector(state => state.momentReducer);

   const isActiveMomentHasKeys = Object.keys(activeMoment).length

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   const { prevState, setPrevState } = getMomentService(momentId!)

   const dispatch = useAppDispatch();

   const handleInputs = (field: string, value: string) => {
      if (value.length <= 20) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch(momentActions.setActiveMoment(updatedMoment));
      }
   };

   return (
      <motion.div className={ style.MomentActivePage }
                  initial={ { x: -10 } }
                  animate={ { x: 0 } }>

         { isActiveMomentHasKeys &&
            <div className={ style.moment }>
               <SaveAndDelete momentId={ momentId! }
                              activeMoment={ activeMoment }
                              setPrevState={ setPrevState }
                              prevState={ prevState }/>

               <Title activeMoment={ activeMoment }
                      handleInputs={ handleInputs }/>

               <Photo momentId={ momentId! }
                      activeMoment={ activeMoment }/>

               <DateAndLocation
                  handleInputs={ handleInputs }
                  activeMoment={ activeMoment }/>

               <Tag activeMoment={ activeMoment }/>
            </div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>
   );
}
