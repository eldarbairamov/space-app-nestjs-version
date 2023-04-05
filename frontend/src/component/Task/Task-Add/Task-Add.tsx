import { useState } from "react";

import { addTaskService } from "@src/service";
import { NoBgInput } from "@src/component";
import { TypedOnChange } from "@src/interface/common.interface";
import { useAppSelector } from "@src/hook";

import style from "./Task-Add.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

export function TaskAdd() {
   const { activePlan } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const [ taskTitle, setTaskTitle ] = useState<string>("");

   const { addTaskFn } = addTaskService(setTaskTitle);

   return (
      <div className={ style.TaskAdd }>
         <div className={ style.task_add }>
            <img onClick={ () => addTaskFn(activePlan.id, taskTitle) }
                 src={ isDark ? addLight : addDark }
                 alt={ "add" }/>

            <NoBgInput type={ "text" }
                       id={ "taskTitle" }
                       style={ { textAlign: "left" } }
                       value={ taskTitle }
                       onChange={ (event: TypedOnChange) => setTaskTitle(event.target.value) }
                       placeholder={ "Що плануєш зробити?" }/>
         </div>
      </div>
   );
}
