import React, { FC } from "react";

import { NotesMain, NotesSidebar } from "../../../component";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { noteActions } from "../../../redux/slice";
import { noteService } from "../../../services";
import {  useQuery } from "@tanstack/react-query";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   const dispatch = useAppDispatch();
   const { searchKey } = useAppSelector(state => state.notesReducer);

   useQuery({
      queryKey: [ "note list", searchKey ],
      queryFn: () => noteService.getNotes({ searchKey }),
      onSuccess: (data) => {
         dispatch(noteActions.setNotes(data.data.data));
      },

   });

   return (
      <div className={ style.NotesPage }>

         {/* Toaster */ }
         <ToasterWithOptions/>

         <div className={ style.left_side }>
            <NotesSidebar/>
         </div>

         <div className={ style.right_side }>
            <NotesMain/>
         </div>

      </div>
   );
};
