import React, { FC } from "react";

import { INote } from "../../../interface";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { DeleteOutlined } from "@ant-design/icons";
import { noteActions } from "../../../redux/slice";
import dateHelper from "moment";
import { message } from "antd";
import { deleteNoteService } from "../../../service";

import style from "./Note-Item-Adaptive.module.scss";
import { AppRouter } from "../../../router";

interface NoteItemAdaptive {
   note: INote;
}

export const NoteItemAdaptive: FC<NoteItemAdaptive> = ({ note }) => {
   const titleCondition = note.title && note.title.split("").length > 30;

   const [ messageApi, contextHolder ] = message.useMessage();

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService(messageApi);

   const { activeNote } = useAppSelector(state => state.noteReducer);

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId);
   };

   return (
      <div className={ style.NoteItemAdaptive }
           onClick={ () => {
              AppRouter.navigate("/notes/edit");
              dispatch(noteActions.setActiveNoteId(note.id));
           } }
           data-active={ note.id === activeNote?.id }
      >
         { contextHolder }

         {/* Title */ }
         <p className={ style.note_title }>
            { titleCondition ? note.title.substring(0, 30) + "..." : note.title }
         </p>

         {/* Delete icon */ }
         <p className={ style.delete }
            onClick={ (e) => deleteNote(note.id, e) }
         >
            <DeleteOutlined style={ { fontSize: "17px" } }/>
         </p>

         {/* Text preview */ }
         <p className={ style.note_body }>
            { note.body }
         </p>

         {/* Date */ }
         <p className={ style.note_date }>
            { dateHelper(note.lastModified).format("DD-MM-YYYY, HH:mm") }
         </p>

      </div>
   );
};
