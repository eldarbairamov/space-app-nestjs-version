import React, { FC } from "react";

import { TypedSetState } from "../../../interface/common.interface";
import { NoBgInput, NoBgButton } from "../../../component";

import add from "../../../asset/note.png";
import style from "./Plan-Header.module.scss";

interface IPlanHeaderProps {
   searchKey: string;
   addPlanFn: () => Promise<void>;
   setSearchKey: TypedSetState<string>;
}

export const PlanHeader: FC<IPlanHeaderProps> = ({ addPlanFn, setSearchKey, searchKey }) => {
   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value);

   return (
      <div className={ style.PlanHeader }>

         {/* Add plan */ }
         <img src={ add } alt={ "add" }/>
         <NoBgButton text={ "Додати план" } hoverSubject={ "plan" } onClick={ () => addPlanFn() }/>

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
};
