import { NoteEdit, NoteSidebar, Modal, Loader, NoteHeaderAdaptive, NoteListAdaptive } from "@src/component";
import { useMatchMedia, useModal } from "@src/hook";
import { getNotesService } from "@src/service";
import { horizontalPresent } from "@src/animation";
import { motion } from "framer-motion";
import { NOTES_COLOR } from "@src/constant/color.constant";

import style from "./Notes-Page.module.scss";

export function NotesPage() {
   const { isWidth1000 } = useMatchMedia();

   const { isLoading } = getNotesService();

   const { toggleModal } = useModal(isLoading);

   return (
      <>
         { !isLoading &&
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
            </>
         }

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={ NOTES_COLOR }/>
         </Modal>
      </>
   );
}
