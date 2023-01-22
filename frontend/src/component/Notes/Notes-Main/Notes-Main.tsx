import React, { useState, type ChangeEvent, type FC } from "react";

import { type INote } from "../../../interface/note.interface";

import style from "./Notes-Main.module.scss";
import toast, { Toaster } from "react-hot-toast";

interface INotesMain {
   activeNote: INote;
   onUpdateNote: (updatedNote: INote) => void;
}

export const NotesMain: FC<INotesMain> = ({ activeNote, onUpdateNote }) => {
   const [ title, setTitle ] = useState<string>("");
   const [ body, setBody ] = useState<string>("");

   const onEditField = (field: string, value: string) => {
      onUpdateNote({
         ...activeNote,
         [field]: value,
         last_modified: Date.now(),
      });

      if (field === "title") {
         setTitle(value);
      }

      if (field === "body") {
         setBody(value);
      }
   };

   const saveNoteToDb = () => {
      const loading = toast.loading("Зачекайте...");

      const noteToSave = {
         title: title ? title : 'Нова замітка',
         body: body,
         last_modified: Date.now(),
      };

      toast.dismiss(loading);
      toast.success('Замітка збережена');

      console.log(noteToSave);
   };

   if (!activeNote) return <div className={style.no_any_notes}> Заміток немає </div>;

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
                   onChange={ (e: ChangeEvent<HTMLInputElement>) => onEditField("title", e.target.value) }/>

            <p onClick={saveNoteToDb}> Зберегти </p>

         </div>

         <div className={ style.textarea }>
            <textarea id={'body'}
                      value={activeNote.body}
                      placeholder={'Розкажи мені щось цікаве...'}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onEditField('body', e.target.value)}/>
         </div>

      </div>
   );
};
