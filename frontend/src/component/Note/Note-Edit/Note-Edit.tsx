import { ChangeEvent, FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { NoBgInput } from "@src/component";
import { updateNoteService } from "@src/service";
import { TypedOnChange } from "@src/interface/common.interface";

import style from "./Note-Edit.module.scss";

export const NoteEdit: FC = () => {
   const { activeNote, notes, font } = useAppSelector(state => state.noteReducer);

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

         {/* Header */ }
         <div className={ style.header }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                       id={ "title" }
                       value={ activeNote.title }
                       onChange={ (event: TypedOnChange) => handleInputs("title", event.target.value) }
                       onBlur={ () => updateNoteFn(activeNote) }
            />

            <div className={ style.font_options }>
               <p onClick={ () => dispatch(noteActions.changeFont('Roboto')) }> Roboto </p>
               <p> | </p>
               <p onClick={ () => dispatch(noteActions.changeFont('Caveat')) }> Caveat </p>
            </div>

         </div>

         {/* Text area */ }
         <div className={ style.textarea }>
                  <textarea id={ "body" }
                            data-font={font}
                            value={ activeNote.body ? activeNote.body : "" }
                            placeholder={ "Розкажи мені щось цікаве..." }
                            onChange={ (event: ChangeEvent<HTMLTextAreaElement>) => handleInputs("body", event.target.value) }
                            onBlur={ () => updateNoteFn(activeNote) }
                  />
         </div>

      </div>
   );
};
