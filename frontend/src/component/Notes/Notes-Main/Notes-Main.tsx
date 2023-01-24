import React, { type ChangeEvent, type FC, useEffect } from "react";

import { type INoteDto } from "../../../interface/note.interface";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hook/redux.hook";
import { notesActions } from "../../../redux/slice/notes.slice";
import { noteService } from "../../../services/note.service";
import { type AxiosApiError } from "../../../services";

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
      } as INoteDto;

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
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
      }
   };

   if (!activeNote) {
      return <div className={ style.no_any_notes }> Заміток немає </div>
   }

   return (
      <div className={ style.Main }>

         <div className={ style.header }>
            <input type="text" id={ "title" }
                   value={ activeNote.title }
                   autoFocus
                   onBlur={ saveNoteToDb }
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => onEditFields("title", e.target.value) }
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
