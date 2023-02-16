import React, { FC } from "react";

import { IInputFields } from "../../../page";
import { TypedSetState } from "../../../interface/common.interface";
import { IPlan, ITask } from "../../../interface";
import { message } from "antd";
import { addTaskService } from "../../../service";

import style from "./Task-Add.module.scss";

interface ITaskAddProps {
   inputFields: IInputFields;
   setInputFields: TypedSetState<IInputFields>;
   plan: IPlan;
   setTasks: TypedSetState<ITask[]>;
   tasks: ITask[];
   onChangeFields(field: string, value: string): void;
}

export const TaskAdd: FC<ITaskAddProps> = ({ setInputFields, onChangeFields, inputFields, plan, setTasks, tasks }) => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { addTaskFn } = addTaskService(messageApi);

   const addTask = async () => {
      if (inputFields.taskTitle !== "") {
         setInputFields({ ...inputFields, taskTitle: "" });
         const newTask = { planId: plan.id, title: inputFields.taskTitle };
         const data = await addTaskFn(newTask) as ITask;
         setTasks([ ...tasks, data ]);
      }
   };

   return (
      <div className={ style.TaskAdd }>
         { contextHolder }

         <p onClick={ addTask }> + </p>
         <input type={ "text" }
                id={ "taskTitle" }
                value={ inputFields.taskTitle }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChangeFields("taskTitle", e.target.value) }
                placeholder={ "Додати задачу" }
         />
      </div>
   );
};
