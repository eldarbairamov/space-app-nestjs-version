import { useEffect, useState } from "react";

import { MessageInstance } from "antd/es/message/interface";
import { IPlan } from "../../interface";
import { errorCatherFn } from "../../helper/catch-error.helper";
import { axiosInstance } from "../axios.service";
import { plansRequests } from "../../config/config";

export default function getPlansService(messageApi: MessageInstance) {
   const [ plans, setPlans ] = useState<IPlan[]>([]);
   const [ searchKey, setSearchKey ] = useState<string>("");

   const getPlansFn = async () => {
      try {
         const { data } = await axiosInstance.get<IPlan[]>(plansRequests.getAllPlans, { params: { searchKey: searchKey || null } });
         setPlans(data);
      } catch (e) {
         messageApi.error(errorCatherFn(e));
      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ searchKey ]);


   return { setPlans, searchKey, setSearchKey, plans };
}