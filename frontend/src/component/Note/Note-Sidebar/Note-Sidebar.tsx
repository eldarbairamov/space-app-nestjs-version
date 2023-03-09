import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import { NoteList } from "@src/component";
import { NoBgInput } from "@src/component";
import { addNoteService } from "@src/service";
import { TypedOnChange } from "@src/interface/common.interface";

import style from "./Note-Sidebar.module.scss";
import addLight from "@src/asset/add-light.svg";
import addDark from "@src/asset/add-dark.svg";

export function NoteSidebar() {
   const { searchKey } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService();

   const handleInput = async (event: TypedOnChange) => {
      dispatch(noteActions.setSearchKey(event.target.value));
   };

   return (
      <div className={ style.NoteSidebar }>

         {/* Header */ }
         <div className={ style.header }>
            <img onClick={ () => addNoteFn() } src={ isDark ? addLight : addDark } alt={ "add" }/>
         </div>

         {/* Note list */ }
         <div className={ style.middle }>
            <NoteList/>
         </div>

         {/* Search bar */ }
         <div className={ style.bottom }>
            <NoBgInput type="text"
                       value={ searchKey }
                       placeholder={ "Пошук" }
                       onChange={ handleInput }
                       style={ { fontSize: "15px" } }
            />
         </div>

      </div>
   );
}