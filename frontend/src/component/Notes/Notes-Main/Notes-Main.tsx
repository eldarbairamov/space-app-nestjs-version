import React, { type ChangeEvent, type FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook";
import { notesActions } from "../../../redux/slice";
import { noteService } from "../../../services";
import { catchErrors } from "../../../helper";

import style from "./Notes-Main.module.scss";
import { NoteDto } from "../../../dto";

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
      } as NoteDto;

      dispatch(notesActions.updateNote(updatedNote));
   };

   const saveNoteToDb = async () => {
      try {
         const noteToSave = {
            title: activeNote?.title,
            body: activeNote?.body,
         };

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
