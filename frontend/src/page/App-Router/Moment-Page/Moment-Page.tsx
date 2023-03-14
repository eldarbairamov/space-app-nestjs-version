import { useState } from "react";

import { MomentHeader, MomentList } from "@src/component";
import { addMomentService, getMomentsService } from "@src/service";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Page.module.scss";
import { Loader } from "@src/component/UI/Loader/Loader";

export function MomentsPage() {
   const [ searchKey, setSearchKey ] = useState<string>("");
   const { isLoading } = useAppSelector(state => state.momentReducer)

   getMomentsService(searchKey);

   const { addMomentFn } = addMomentService();

   return (
      <motion.div className={ style.MomentPage }
                  variants={ horizontalPresent }
                  initial={ "initial" }
                  animate={ "animate" }
      >

         { isLoading ? <Loader/> :
            <>
               {/* Header */ }
               <MomentHeader addMomentFn={ addMomentFn } setSearchKey={ setSearchKey }/>

               {/* Moment list wrapper */ }
               <div className={ style.moment_list_wrapper }><MomentList/></div>
            </>
         }
      </motion.div>

   );
}
