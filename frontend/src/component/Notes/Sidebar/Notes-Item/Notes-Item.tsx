import React, { type FC } from "react";

import { type INoteDto } from "../../../../interface/note.interface";
import { useAppDispatch, useAppSelector } from "../../../../hook/redux.hook";
import { asyncNotesActions, notesActions } from "../../../../redux/slice/notes.slice";
import { DeleteFilled } from "@ant-design/icons";

import style from "./Notes-Item.module.scss";
import deleteIcon from '../../../../asset/delete-3.png'

interface INotesItem {
   note: INoteDto;
}

export const NotesItem: FC<INotesItem> = ({ note }) => {
   const bodyCondition = note.body && note.body.split("").length > 25;
   const titleCondition = note.title.split("").length > 20;

   const dispatch = useAppDispatch();
   const { activeNote } = useAppSelector(state => state.notesReducer);

   const deleteNote = (noteId: string, e: React.MouseEvent<HTMLParagraphElement>): void => {
      e.stopPropagation();
      dispatch(asyncNotesActions.deleteNote({ noteId }));
   };

   return (
      <div className={ style.NotesItem } onClick={ () => dispatch(notesActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }>

         <p className={ style.title }> { titleCondition ? note.title.substring(0, 20) + "..." : note.title } </p>

         <p className={ style.delete }
            onClick={ (e: React.MouseEvent<HTMLParagraphElement>) => deleteNote(note.id, e) }><img src={deleteIcon} alt="delete"/> </p>

         <p className={ style.body }> { bodyCondition ? note.body.substring(0, 25) + "..." : note.body } </p>

         <p className={ style.date }>
            { new Date(note.lastModified).toLocaleDateString("en-GB", {
               hour: "2-digit",
               minute: "2-digit",
            }) }
         </p>

      </div>
   );
};
