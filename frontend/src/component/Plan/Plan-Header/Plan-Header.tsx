import React from "react";

import { NoBgInput, NoBgButton } from "../../../component";
import { addPlanService } from "../../../service";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { planAction } from "../../../redux/slice";
import { TypedOnChange } from "../../../interface/common.interface";

import style from "./Plan-Header.module.scss";
import addLight from "../../../asset/add-light.svg";
import addDark from "../../../asset/add-dark.svg";

export function PlanHeader() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { searchKey } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addPlanFn } = addPlanService(messageApi);

   const handleInput = (event: TypedOnChange) => dispatch(planAction.setSearchKey(event.target.value));

   return (
      <div className={ style.PlanHeader }>
         { contextHolder }

         {/* Add plan */ }
         <img src={ isDark  ? addLight : addDark } alt={ "add" }/>
         <NoBgButton text={ "Додати план" } hoverSubject={ "plan" } onClick={ addPlanFn }/>

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
