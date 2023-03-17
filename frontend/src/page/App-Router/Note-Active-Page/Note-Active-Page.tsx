import { ChangeEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@src/hook";
import { Empty } from "antd";
import { updateNoteService } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { NoBgInput } from "@src/component";
import { AppRouter } from "@src/router";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Note-Active-Page.module.scss";

export function NoteActivePage() {
   const { activeNote, notes, font } = useAppSelector(state => state.noteReducer);

   const { updateNoteFn } = updateNoteService();

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!notes.length) AppRouter.navigate("/notes");
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
                  animate={ "animate" }
      >

         {/* Header */ }
         <div className={ style.header }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                       id={ "title" }
                       value={ activeNote.title }
                       onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                       onBlur={ () => updateNoteFn(activeNote) }
            />

            <div className={ style.font_options }>
               <p onClick={ () => dispatch(noteActions.changeFont('Roboto')) }> Roboto </p>
               <p> | </p>
               <p onClick={ () => dispatch(noteActions.changeFont('Caveat')) }> Caveat </p>
            </div>

         </div>

         {/* Text area */ }
         <div className={ style.textarea }>
            <textarea id={ "body" }
                      data-font={ font }
                      value={ activeNote.body }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                      onBlur={ () => updateNoteFn(activeNote) }
            />
         </div>

      </motion.div>
   );
}
