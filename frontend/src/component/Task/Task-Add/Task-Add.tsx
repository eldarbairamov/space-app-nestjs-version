import { useState } from "react";

import { ITask } from "@src/interface";
import { addTaskService } from "@src/service";
import { NoBgInput } from "@src/component";
import { TypedOnChange } from "@src/interface/common.interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { taskAction } from "@src/redux/slice";

import style from "./Task-Add.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

export function TaskAdd() {
   const { activePlan } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const [ taskTitle, setTaskTitle ] = useState<string>("");

   const { addTaskFn } = addTaskService();

   const addTask = async () => {
      if (taskTitle !== "") {
         setTaskTitle("");
         const newTask = { planId: activePlan.id, title: taskTitle };
         const data = await addTaskFn(newTask) as ITask;
         dispatch(taskAction.addTask(data));
      }
   };

   return (
      <div className={ style.TaskAdd }>
         <img onClick={ addTask } src={ isDark ? addLight : addDark } alt={ "add" }/>

         <NoBgInput type={ "text" }
                    id={ "taskTitle" }
                    style={ { textAlign: "left" } }
                    value={ taskTitle }
                    onChange={ (event: TypedOnChange) => setTaskTitle(event.target.value) }
                    placeholder={ "Що плануєш зробити?" }
         />

      </div>
   );
}
