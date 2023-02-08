import React, { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hook";
import { noteActions } from "../../../../redux/slice";
import { DeleteOutlined } from "@ant-design/icons";
import { catchErrors, dateFormat } from "../../../../helper";
import { noteService } from "../../../../services";
import { INote } from "../../../../interface";

import style from "./Note-Item.module.scss";

interface INoteItem {
   note: INote;
}

export const NoteItem: FC<INoteItem> = ({ note }) => {
   const bodyCondition = note.body && note.body.split("").length > 35;
   const titleCondition = note.title && note.title.split("").length > 30;

   const dispatch = useAppDispatch();

   const { activeNote } = useAppSelector(state => state.notesReducer);

   const deleteNote = async (noteId: string, e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      try {
         e.stopPropagation();

         await noteService.deleteNote(noteId);

         dispatch(noteActions.deleteNote(noteId));

      } catch (e) {
         catchErrors(e);
      }
   };

   const formatDate = dateFormat(note.lastModified);

   return (
      <div className={ style.NoteItem }
           onClick={ () => dispatch(noteActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }
      >

         <p className={ style.note_title }> { titleCondition ? note.title.substring(0, 30) + "..." : note.title } </p>

         <p className={ style.delete }
            onClick={ (e: React.MouseEvent<HTMLParagraphElement>) => deleteNote(note.id, e) }><DeleteOutlined
            style={ { fontSize: "17px" } }/></p>

         <p className={ style.note_body }> { bodyCondition ? note.body.substring(0, 35) + "..." : note.body } </p>

         <p className={ style.note_date }> { formatDate } </p>

      </div>
   );
};
