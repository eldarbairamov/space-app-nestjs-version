import React, { useState, type ChangeEvent, type FC, useEffect } from "react";

import { type INote } from "../../../interface/note.interface";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hook/redux.hook";
import { notesActions } from "../../../redux/slice/notes.slice";

import style from "./Notes-Main.module.scss";

export const NotesMain: FC = () => {
   const dispatch = useAppDispatch();
   const { activeNote } = useAppSelector(state => state.notesReducer);

   const onEditFields = (field: string, value: string) => {

      const updatedNote = {
         ...activeNote,
         [field]: value,
         last_modified: Date.now(),
      } as INote;

      dispatch(notesActions.updateNote(updatedNote));

   };

   const saveNoteToDb = () => {
      const loading = toast.loading("Зачекайте...");

      console.log(activeNote);

      toast.dismiss(loading);
      toast.success("Замітка збережена");
   };

   if (!activeNote) return <div className={ style.no_any_notes }> Заміток немає </div>;

   return (
      <div className={ style.Main }>

         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         <div className={ style.header }>

            <input type="text" id={ "title" }
                   value={ activeNote.title }
                   autoFocus
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => onEditFields("title", e.target.value) }/>

            <p onClick={ saveNoteToDb }> Зберегти </p>

         </div>

         <div className={ style.textarea }>
            <textarea id={ "body" }
                      value={ activeNote.body }
                      placeholder={ "Розкажи мені щось цікаве..." }
                      onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => onEditFields("body", e.target.value) }/>
         </div>

      </div>
   );
};
