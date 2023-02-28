import React, { useState } from "react";

import { ITask } from "../../../interface";
import { message } from "antd";
import { addTaskService } from "../../../service";
import { NoBgInput } from "../../UI/No-Bg-Input/No-Bg-Input";
import { TypedOnChange } from "../../../interface/common.interface";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { taskAction } from "../../../redux/slice/task.slice";

import style from "./Task-Add.module.scss";

export function TaskAdd() {
   const [ messageApi, contextHolder ] = message.useMessage();

   const {activePlan} = useAppSelector(state => state.planReducer)

   const dispatch = useAppDispatch();

   const [ taskTitle, setTaskTitle ] = useState<string>("");

   const { addTaskFn } = addTaskService(messageApi);

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
         { contextHolder }

         <p onClick={ addTask }> + </p>
         <NoBgInput type={ "text" }
                    id={ "taskTitle" }
                    style={ { textAlign: "left" } }
                    value={ taskTitle }
                    onChange={ (event: TypedOnChange) => setTaskTitle(event.target.value) }
                    placeholder={ "Додати задачу" }
         />

      </div>
   );
}
