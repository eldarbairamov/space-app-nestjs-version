import React, { type ChangeEvent, type FC, useEffect } from "react";

import { type INoteDto } from "../../../interface";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { notesActions } from "../../../redux/slice";
import { noteService } from "../../../services";
import { catchErrors } from "../../../helper";
import { noteValidator } from "../../../validator/note.validator";

import style from "./Notes-Main.module.scss";

export const NotesMain: FC = () => {
   const dispatch = useAppDispatch();
   const { activeNote, notes } = useAppSelector(state => state.notesReducer);

   useEffect(() => {
      dispatch(notesActions.showDefaultNote(notes[0]));
   }, []);

   const onEditFields = (field: string, value: string) => {
      const updatedNote = {
         ...activeNote,
         [field]: value,
         lastModified: Date.now(),
      } as INoteDto;

      dispatch(notesActions.updateNote(updatedNote));
   };

   const saveNoteToDb = async () => {
      try {
         const noteToSave = {
            title: activeNote?.title,
            body: activeNote?.body,
         };

         const validation = noteValidator.validate(noteToSave);
         if (validation.error) throw new Error(validation.error.message);

         await noteService.saveNote(noteToSave, activeNote?.id!);

      } catch (e) {
         catchErrors(e);
      }
   };

   if (!activeNote) {
      return <div className={ style.no_any_notes }> Заміток немає </div>;
   }

   return (
      <div className={ style.Main }>

         <div className={ style.header }>
            <input type={ "text" }
                   id={ "title" }
                   value={ activeNote.title }
                   autoFocus
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => onEditFields("title", e.target.value) }
                   onBlur={ saveNoteToDb }
            />
         </div>

         <div className={ style.textarea }>
            <textarea id={ "body" }
                      value={ activeNote.body }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => onEditFields("body", e.target.value) }
                      onBlur={ saveNoteToDb }
            />
         </div>

      </div>
   );
};
