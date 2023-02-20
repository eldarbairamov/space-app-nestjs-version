import React, { useState } from "react";

import { MomentHeader, MomentList } from "../../../component";
import { message } from "antd";
import { addMomentService, getMomentsService } from "../../../service";

import style from "./Moment-Page.module.scss";

export function MomentsPage () {
   const [ searchKey, setSearchKey ] = useState<string>("");

   const [ messageApi, contextHolder ] = message.useMessage();

   getMomentsService(searchKey, messageApi);

   const { addMomentFn } = addMomentService(messageApi);

   return (
      <div className={ style.MomentPage }>
         { contextHolder }

         {/* Header */ }
         <MomentHeader addMomentFn={ addMomentFn } setSearchKey={ setSearchKey }/>

         {/* Moment list wrapper */ }
         <div className={ style.moment_list_wrapper }> <MomentList /> </div>

      </div>

   );
}
