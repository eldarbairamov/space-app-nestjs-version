import React, { type FC, useState } from "react";

import { NotesMain } from "../../../component/Notes/Notes-Main/Notes-Main";
import { NotesSidebar } from "../../../component/Notes/Sidebar/Notes-Sidebar/Notes-Sidebar";
import { type INote } from "../../../interface/note.interface";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   const [ notes, setNotes ] = useState<INote[]>([]);
   const [ activeNoteId, setActiveNoteId ] = useState<number>();

   const addNote = (): void => {
      const newNote = {
         id: Date.now(),
         body: '',
         title: "Нова замітка",
         last_modified: Date.now(),
      };

      setNotes([ ...notes, newNote ]);
      setActiveNoteId(newNote.id);
   };

   const getActiveNote = (): INote => {
      return notes.find(({ id }) => id === activeNoteId) as INote;
   };

   const onUpdateNote = (updatedNote: INote) => {
      const updatedNotesArr = notes.map(note => {
         if (note.id === updatedNote.id) {
            return updatedNote;
         }

         return note;
      });

      setNotes(updatedNotesArr);
   };

   return (
      <div className={ style.NotesPage }>

         <div className={ style.left_side }>
            <NotesSidebar addNote={ addNote } notes={ notes } setActiveNoteId={setActiveNoteId} activeNoteId={activeNoteId}/>
         </div>

         <div className={ style.right_side }>
            <NotesMain activeNote={ getActiveNote() } onUpdateNote={onUpdateNote}/>
         </div>

      </div>
   );
};
