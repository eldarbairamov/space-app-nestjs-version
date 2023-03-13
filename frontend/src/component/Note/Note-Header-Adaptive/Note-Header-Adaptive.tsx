import { NoBgInput, NoBgButton } from "@src/component";
import { addNoteService } from "@src/service";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { TypedOnChange } from "@src/interface/common.interface";
import { noteActions } from "@src/redux/slice";

import style from "./Note-Header-Adaptive.module.scss";
import addLight from "@src/asset/add-light.svg";
import addDark from "@src/asset/add-dark.svg";

export function NoteHeader() {
   const { searchKey } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService();

   const handleInput = (event: TypedOnChange) => dispatch(noteActions.setSearchKey(event.target.value));

   return (
      <div className={ style.NoteHeaderAdaptive }>

         {/* Add note */ }
         <img src={ isDark ? addLight : addDark } alt={ "add" }/>
         <NoBgButton text={ "Додати" } hoverSubject={ "notes" } onClick={ addNoteFn }/>

         {/* Search bar */ }
         <div className={ style.search_bar }>
            <NoBgInput type="text"
                       style={ { fontSize: "15px" } }
                       value={ searchKey }
                       onChange={ handleInput }
                       placeholder={ "Пошук" }
            />
         </div>

      </div>
   );
}
