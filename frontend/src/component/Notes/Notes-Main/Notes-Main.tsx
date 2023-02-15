import React, { ChangeEvent, FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { INote } from "../../../interface";
import updateNoteService from "../../../service/note/update-note.service";
import { message } from "antd";

import style from "./Notes-Main.module.scss";

export const NotesMain: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { updateNoteFn } = updateNoteService(messageApi);

   const { activeNote, notes } = useAppSelector(state => state.notesReducer);

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

   const updateNote = async () => updateNoteFn(activeNote!);

   if (!activeNote) return <div className={ style.no_any_notes }> Заміток немає </div>;

   return (
      <div className={ style.Main }>
         { contextHolder }

         <div className={ style.header }>
            <input type={ "text" }
                   id={ "title" }
                   value={ activeNote.title }
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                   onBlur={ updateNote }
            />
         </div>

         <div className={ style.textarea }>
            <textarea id={ "body" }
                      value={ activeNote.body }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                      onBlur={ updateNote }
            />
         </div>

      </div>
   );
};
