import React, { ChangeEvent, FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { INote } from "../../../interface";
import { Empty, message } from "antd";
import { NoBgInput } from "../../../component";
import { updateNoteService } from "../../../service";

import style from "./Note-Edit.module.scss";

export const NoteEdit: FC = () => {
   const { activeNote, notes } = useAppSelector(state => state.noteReducer);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateNoteFn } = updateNoteService(messageApi);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(noteActions.setDefaultNote(notes[0]));
   }, []);


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
      <div className={ style.NoteEdit }>
         { contextHolder }

         {/* Header */ }
         <div className={ style.header }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "18px", width: "500px", fontWeight: "500", color: "#4e4e51" } }
                       id={ "title" }
                       value={ activeNote.title }
                       onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                       onBlur={ () => updateNoteFn(activeNote) }
            />
         </div>

         {/* Text area */ }
         <div className={ style.textarea }>
            <textarea id={ "body" }
                      value={ activeNote.body ? activeNote.body : "" }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                      onBlur={ () => updateNoteFn(activeNote) }
            />
         </div>

      </div>
   );
};
