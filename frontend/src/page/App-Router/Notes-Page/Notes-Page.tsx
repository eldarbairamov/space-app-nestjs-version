import React, { type FC, useEffect } from "react";

import { NotesMain } from "../../../component/Notes/Notes-Main/Notes-Main";
import { NotesSidebar } from "../../../component/Notes/Sidebar/Notes-Sidebar/Notes-Sidebar";
import { useAppDispatch, useAppSelector } from "../../../hook/redux.hook";
import { asyncNotesActions } from "../../../redux/slice/notes.slice";
import toast, { Toaster } from "react-hot-toast";

import style from "./Notes-Page.module.scss";

export const NotesPage: FC = () => {

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(asyncNotesActions.getNotes());
   }, []);

   return (
      <div className={ style.NotesPage }>

            <>
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
            </>

      </div>
   );
};
