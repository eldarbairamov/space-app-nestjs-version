import { ChangeEvent, FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { NoBgInput } from "@src/component";
import { updateNoteService } from "@src/service";

import style from "./Note-Edit.module.scss";
import { Loader } from "@src/component/UI/Loader/Loader";

export const NoteEdit: FC = () => {
   const { activeNote, notes, isLoading } = useAppSelector(state => state.noteReducer);

   const { updateNoteFn } = updateNoteService();

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(noteActions.setDefaultNote(notes[0]));
   }, []);


   const handleInputs = (field: string, value: string) => {
      const updatedNote = {
         ...activeNote,
         [field]: value,
         lastModified: Date.now(),
      } as INote;

      dispatch(noteActions.updateNote(updatedNote));
   };

   if (!activeNote) return (
      <div className={ style.no_notes_wrapper }>
         <p> Пусто.. </p>
      </div>
   );

   return (
      <div className={ style.NoteEdit }>

         { isLoading ? <Loader/> :

            <>
               {/* Header */ }
               <div className={ style.header }>
                  <NoBgInput type={ "text" }
                             style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                             id={ "title" }
                             value={ activeNote.title }
                             onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                             onBlur={ () => updateNoteFn(activeNote) }
                  />
               </div>

               {/* Text area */ }
               <div className={ style.textarea }>
                  <textarea id={ "body" }
                            value={ activeNote.body ? activeNote.body : "" }
                            placeholder={ "Розкажи мені щось цікаве..." }
                            onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", e.target.value) }
                            onBlur={ () => updateNoteFn(activeNote) }
                  />
               </div>
            </> }

      </div>
   );
};
