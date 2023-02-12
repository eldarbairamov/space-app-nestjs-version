import React, { FC, useState } from "react";

import { momentService } from "../../../services";
import { catchErrors } from "../../../helper";
import { MomentItem } from "../../../component/Moments/Moment-Item/Moment-Item";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { momentActions } from "../../../redux/slice";
import { useQuery } from "@tanstack/react-query";
import { ToasterWithOptions } from "../../../component/UI/Toaster-With-Options/Toaster-With-Options";
import { ConfigProvider, Select } from "antd";

import style from "./Moments-Page.module.scss";
import add from "../../../asset/note.png";

export const MomentsPage: FC = () => {
   const [ tags, setTags ] = useState<(string | undefined)[]>([]);
   const [ searchKey, setSearchKey ] = useState("");

   const dispatch = useAppDispatch();

   const { refetch } = useQuery({
      queryKey: [ "moment list", searchKey ],
      queryFn: () => momentService.getMoments(searchKey),
      onSuccess: ({ data }) => {
         dispatch(momentActions.setMoments(data.data));
         setTags(data.tagsForFilter)
      },
      onError: (err) => catchErrors(err),
   });

   const { moments } = useAppSelector(state => state.momentReducer);

   const select = (value: string) => setSearchKey(value);

   const addMoment = async () => {
      try {
         await momentService.addMoment();
         await refetch();
      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <div className={ style.MemoriesPage }>
         {/* Toaster */ }
         <ToasterWithOptions/>

         {/* Header */ }
         <div className={ style.header }>
            <div className={ style.save_moment }>
               <img src={ add } alt={ "add" }/>
               <button onClick={ addMoment }> Зберегти момент</button>

               <div className={ style.select_wrapper }>
                  <ConfigProvider theme={ { token: { colorPrimaryBg: "#e9e9ff" } } }>
                     <Select style={ { width: 130 } }
                             size={ "large" }
                             placeholder="Фільтр"
                             bordered={ false }
                             onChange={ select }
                             options={ tags.map(tag => ({ value: tag, label: tag })) }
                     />
                  </ConfigProvider>
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
