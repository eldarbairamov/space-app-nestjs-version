import { useState } from "react";

import { NoteEdit, NoteSidebar, Modal, Loader, NoteHeaderAdaptive, NoteListAdaptive } from "@src/component";
import { useAppSelector, useMatchMedia } from "@src/hook";
import { getNotesService } from "@src/service";
import { horizontalPresent } from "@src/animation";
import { motion } from "framer-motion";

import style from "./Notes-Page.module.scss";

export function NotesPage() {
   const { isWidth1000 } = useMatchMedia();

   const { isLoading } = useAppSelector(state => state.noteReducer);

   const [ isOpen, setIsOpen ] = useState<boolean>(false);

   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   getNotesService();

   return (
      <>
         { !isWidth1000 &&
            <motion.div className={ style.NotesPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>
               <NoteSidebar/>
               <NoteEdit/>
            </motion.div>
         }

         { isWidth1000 &&
            <motion.div className={ style.NotesPageAdaptive }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>
               <NoteHeaderAdaptive/>
               <NoteListAdaptive/>
            </motion.div>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader/>
         </Modal>
      </>
   );
}
