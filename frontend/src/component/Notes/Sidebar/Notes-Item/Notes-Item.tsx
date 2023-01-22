import React, { type FC } from "react";

import { type INote } from "../../../../interface/note.interface";
import { useAppDispatch, useAppSelector } from "../../../../hook/redux.hook";
import { notesActions } from "../../../../redux/slice/notes.slice";

import style from "./Notes-Item.module.scss";

interface INotesItem {
   note: INote;
}

export const NotesItem: FC<INotesItem> = ({ note }) => {
   const bodyCondition = note.body && note.body.split("").length > 35;
   const titleCondition = note.title.split("").length > 20;

   const dispatch = useAppDispatch();
   const { activeNoteId } = useAppSelector(state => state.notesReducer);

   return (
      <div className={ style.NotesItem } onClick={ () => dispatch(notesActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNoteId }>

         <p className={ style.title }> { titleCondition ? note.title.substring(0, 20) + "..." : note.title } </p>

         <p className={ style.body }> { bodyCondition ? note.body.substring(0, 35) + "..." : note.body } </p>

         <p className={ style.date }>
            { new Date(note.last_modified).toLocaleDateString("en-GB", {
               hour: "2-digit",
               minute: "2-digit",
            }) }
         </p>

      </div>
   );
};
