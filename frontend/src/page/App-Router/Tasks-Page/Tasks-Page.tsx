import { IPlan } from "@src/interface";
import { TaskAdd, TaskHeader, TaskList } from "@src/component";
import { getTasksService } from "@src/service";
import { useParams } from "react-router-dom";
import { getOnePlanService } from "@src/service/plan/get-one-plan.service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Tasks-Page.module.scss";

export function TasksPage() {
   const { planId } = useParams<{ planId: IPlan["id"] }>();

   getOnePlanService(planId!);

   getTasksService(planId!);

   return (
      <motion.div className={ style.TasksPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         {/* Header */ }
         <TaskHeader/>

         {/* Add task */ }
         <div className={ style.add_task_wrapper }>
            <TaskAdd/>
         </div>

         {/* Task list */ }
         <div className={ style.task_list_wrapper }>
            <TaskList/>
         </div>

      </motion.div>
   );
}
