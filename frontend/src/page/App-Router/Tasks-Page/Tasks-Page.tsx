import React from "react";

import { IPlan } from "../../../interface";
import { TaskAdd, TaskHeader, TaskList } from "../../../component";
import { message } from "antd";
import { getTasksService } from "../../../service";
import { useParams } from "react-router-dom";
import { getOnePlanService } from "../../../service/plan/get-one-plan.service";
import { motion } from "framer-motion";

import style from "./Tasks-Page.module.scss";
import { horizontalPresent } from "../../../animation";

export function TasksPage() {
   const { planId } = useParams<{ planId: IPlan["id"] }>();

   const [ messageApi, contextHolder ] = message.useMessage();

   getOnePlanService(messageApi, planId!);

   getTasksService(messageApi, planId!);

   return (
      <motion.div className={ style.TasksPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >
         { contextHolder }

         {/* Header */ }
         <TaskHeader />

         {/* Add task */ }
         <div className={ style.add_task_wrapper }>
            <TaskAdd />
         </div>

         {/* Task list */ }
         <div className={ style.task_list_wrapper }>
            <TaskList/>
         </div>

      </motion.div>
   );
}
