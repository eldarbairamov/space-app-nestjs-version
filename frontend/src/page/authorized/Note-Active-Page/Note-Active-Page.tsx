import { ChangeEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@src/hook";
import { Empty } from "antd";
import { updateNoteService } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { NoBgInput } from "@src/component";
import { AuthorizedRouter } from "@src/router";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Note-Active-Page.module.scss";
import { FontOptions } from "@src/component/Note/Font-Options/Font-Options";
import { TextArea } from "@src/component/Note/Text-Area/Text-Area";

export function NoteActivePage() {
   const { activeNote, notes, font } = useAppSelector(state => state.noteReducer);

   const { updateNoteFn } = updateNoteService();

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!notes.length) AuthorizedRouter.navigate("/notes");
   }, [ notes ]);

   const handleInputs = (field: string, value: string) => {
      const updatedNote = {
         ...activeNote,
         [field]: value,
         lastModified: Date.now(),
      } as INote;

      dispatch(noteActions.updateNote(updatedNote));
   };

   if (!activeNote) return <div className={ style.no_notes_wrapper }><Empty description={ "Заміток  немає" }/></div>;

   return (
      <motion.div className={ style.NoteActivePage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }>

         <div className={ style.header }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                       id={ "title" }
                       value={ activeNote.title }
                       onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                       onBlur={ () => updateNoteFn(activeNote) }/>

            <FontOptions font={ font }/>

         </div>

         <TextArea handleInputs={ handleInputs }
                   updateNoteFn={ updateNoteFn }
                   font={ font }
                   activeNote={ activeNote }/>

      </motion.div>
   );
}
