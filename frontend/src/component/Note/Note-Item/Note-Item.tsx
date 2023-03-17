import React, { forwardRef } from "react";

import { INote } from "@src/interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { DeleteOutlined } from "@ant-design/icons";
import { noteActions } from "@src/redux/slice";
import dateHelper from "moment";
import { deleteNoteService } from "@src/service";

import style from "./Note-Item.module.scss";

interface INoteItem {
   note: INote;
}

export const NoteItem = forwardRef(({ note }: INoteItem, ref: any) => {
   const titleCondition = note.title && note.title.split("").length > 30;

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService();

   const { activeNote, total, searchKey } = useAppSelector(state => state.noteReducer);

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId, total, searchKey);
   };

   return (
      <div ref={ ref } className={ style.NoteItem }
           onClick={ () => dispatch(noteActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }
      >

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
         <div className={ style.note_body }>
            <p>{ note.body }</p>
         </div>

         {/* Date */ }
         <p className={ style.note_date }>
            { dateHelper(note.lastModified).format("DD-MM-YYYY, HH:mm") }
         </p>

      </div>
   );
});
