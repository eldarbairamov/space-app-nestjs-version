import React, { ChangeEvent, FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { noteService } from "../../../services";
import { catchErrors } from "../../../helper";
import { INote, IUpdateNote } from "../../../interface";

import style from "./Notes-Main.module.scss";

export const NotesMain: FC = () => {
   const dispatch = useAppDispatch();

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

   const updateNote = async () => {
      try {
         const noteToSave = {
            title: activeNote?.title,
            body: activeNote?.body,
         } as IUpdateNote;

         await noteService.saveNote(noteToSave, activeNote?.id!);

      } catch (e) {
         catchErrors(e);
      }
   };

   if (!activeNote) return <div className={ style.no_any_notes }> Заміток немає </div>;

   return (
      <div className={ style.Main }>

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
