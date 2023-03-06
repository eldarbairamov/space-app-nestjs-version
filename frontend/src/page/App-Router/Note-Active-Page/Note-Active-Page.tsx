import { ChangeEvent, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook";
import { Empty, message } from "antd";
import { updateNoteService } from "../../../service";
import { noteActions } from "../../../redux/slice";
import { INote } from "../../../interface";
import { NoBgInput } from "../../../component";
import { AppRouter } from "../../../router";
import { motion } from "framer-motion";
import { horizontalPresent } from "../../../animation";

import style from "./Note-Active-Page.module.scss";

export function NoteActivePage() {
   const { activeNote, notes } = useAppSelector(state => state.noteReducer);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateNoteFn } = updateNoteService(messageApi);

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
         { contextHolder }

         {/* Header */ }
         <div className={ style.header }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                       id={ "title" }
                       value={ activeNote.title }
                       onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                       onBlur={ () => updateNoteFn(activeNote) }
            />
         </div>

         {/* Text area */ }
         <div className={ style.textarea }>
            <textarea id={ "body" }
                      value={ activeNote.body }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                      onBlur={ () => updateNoteFn(activeNote) }
            />
         </div>

      </motion.div>
   );
}
