import React, { type FC, useEffect } from "react";

import { NotesMain, NotesSidebar } from "../../../component";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { asyncNotesActions } from "../../../redux/slice";
import { Toaster } from "react-hot-toast";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {
   const { searchKey } = useAppSelector(state => state.notesReducer);

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (searchKey === "") dispatch(asyncNotesActions.getNotes());

   }, [ searchKey ]);

   return (
      <div className={ style.NotesPage }>

         {/* Toaster */ }
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

         <div className={ style.left_side }>
            <NotesSidebar/>
         </div>

         <div className={ style.right_side }>
            <NotesMain/>
         </div>

      </div>
   );
};
