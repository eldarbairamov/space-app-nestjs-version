import React, { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../../hook";
import { noteActions } from "../../../../redux/slice";
import { DeleteOutlined } from "@ant-design/icons";
import { dateFormat } from "../../../../helper";
import { INote } from "../../../../interface";
import deleteNoteService from "../../../../service/note/delete-note.service";
import { message } from "antd";

import style from "./Note-Item.module.scss";

interface INoteItem {
   note: INote;
}

export const NoteItem: FC<INoteItem> = ({ note }) => {
   const bodyCondition = note.body && note.body.split("").length > 35;
   const titleCondition = note.title && note.title.split("").length > 30;

   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService(messageApi);

   const { activeNote } = useAppSelector(state => state.notesReducer);

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId);
   };

   const formatDate = dateFormat(note.lastModified);

   return (
      <div className={ style.NoteItem }
           onClick={ () => dispatch(noteActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }
      >
         { contextHolder }

         <p className={ style.note_title }> { titleCondition ? note.title.substring(0, 30) + "..." : note.title } </p>

         <p className={ style.delete }
            onClick={ (e: React.MouseEvent<HTMLParagraphElement>) => deleteNote(note.id, e) }><DeleteOutlined
            style={ { fontSize: "17px" } }/></p>

         <p className={ style.note_body }> { bodyCondition ? note.body.substring(0, 35) + "..." : note.body } </p>

         <p className={ style.note_date }> { formatDate } </p>

      </div>
   );
};
