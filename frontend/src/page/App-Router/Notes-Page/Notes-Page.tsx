import { NoteEdit, NoteSidebar } from "@src/component";
import { useMatchMedia } from "@src/hook";
import { NoteHeader } from "@src/component/Note/Note-Header-Adaptive/Note-Header-Adaptive";
import { NoteListAdaptive } from "@src/component/Note/Note-List-Adaptive/Note-List-Adaptive";
import { getNotesService } from "@src/service";
import { horizontalPresent } from "@src/animation";
import { motion } from "framer-motion";

import style from "./Notes-Page.module.scss";

export function NotesPage() {
   const { isWidth1000 } = useMatchMedia();

   getNotesService();

   return (
      <>
         { !isWidth1000
            ?
            <motion.div className={ style.NotesPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }
            >
               <div className={ style.left_side }>
                  <NoteSidebar/>
               </div>

               <div className={ style.right_side }>
                  <NoteEdit/>
               </div>
            </motion.div>
            :
            <motion.div className={ style.NotesPageAdaptive }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }
            >
               <NoteHeader/>

               <div className={ style.note_list_wrapper }>
                  <NoteListAdaptive/>
               </div>
            </motion.div>
         }

      </>
   );
}
