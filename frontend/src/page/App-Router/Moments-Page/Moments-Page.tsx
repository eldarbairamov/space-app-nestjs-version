import React, { FC, useState } from "react";

import { MomentItem } from "../../../component/Moments/Moment-Item/Moment-Item";
import { useAppSelector } from "../../../hook";
import { message, Select } from "antd";
import getMomentsService from "../../../service/moment/get-moments.service";
import addMomentService from "../../../service/moment/add-moment.service";

import style from "./Moments-Page.module.scss";
import add from "../../../asset/note.png";

export const MomentsPage: FC = () => {
   const [ searchKey, setSearchKey ] = useState("");

   const { moments } = useAppSelector(state => state.momentReducer);

   const [ messageApi, contextHolder ] = message.useMessage();

   const { tags } = getMomentsService(searchKey, messageApi);

   const { addMomentFn } = addMomentService(messageApi);

   const select = (value: string) => setSearchKey(value);

   const addMoment = async () => addMomentFn();

   return (
      <div className={ style.MemoriesPage }>
         {contextHolder}

         {/* Header */ }
         <div className={ style.header }>
            <div className={ style.save_moment }>
               <img src={ add } alt={ "add" }/>
               <button onClick={ addMoment }> Зберегти момент</button>

               <div className={ style.select_wrapper }>
                  <Select style={ { width: 130 } }
                          placeholder="Фільтр"
                          bordered={ false }
                          onChange={ select }
                          options={ tags.map(tag => ({ value: tag, label: tag })) }
                  />
               </div>
            </div>
         </div>

         {/* Main */ }
         <div className={ style.main }>
            <div className={ style.moments_list }>
               { moments && moments.map(moment => <MomentItem key={ moment.id } moment={ moment }/>) }
            </div>
         </div>

      </div>

   );
};
