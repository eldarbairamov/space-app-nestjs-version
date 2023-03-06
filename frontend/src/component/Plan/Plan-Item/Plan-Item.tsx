import React, { forwardRef } from "react";

import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { IPlan } from "../../../interface";
import dateHelper from "moment/moment";
import { TypedOnClick } from "../../../interface/common.interface";
import { deletePlanService } from "../../../service";
import { message } from "antd";

import style from "./Plan-Item.module.scss";
import brain from "../../../asset/brain.png";
import { useAppSelector } from "../../../hook";

interface IPlanItemProps {
   plan: IPlan;
}

export const PlanItem = forwardRef(({ plan }: IPlanItemProps, ref: any) => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { total, searchKey } = useAppSelector(state => state.planReducer);

   const titleCondition = plan && plan.title.split("").length > 16;

   const navigate = useNavigate();

   const { deletePlanFn } = deletePlanService(messageApi);

   const deletePlan = async (event: TypedOnClick<HTMLParagraphElement>, targetId: string) => {
      event.stopPropagation();
      await deletePlanFn(targetId, total, searchKey);
   };

   const choosePlan = (plan: IPlan) => navigate(`/plans/${ plan.id }`);

   return (
      <div ref={ ref } className={ style.PlanItem }
           onClick={ () => choosePlan(plan) }
      >
         { contextHolder }

         <p className={ style.plan_name }> { titleCondition ? plan.title.substring(0, 16) + "..." : plan.title }  </p>

         <p className={ style.delete }
            onClick={ event => deletePlan(event, plan.id) }>
            <DeleteOutlined style={ { fontSize: "20px" } }/>
         </p>

         <img src={ brain } alt="folder"/>

         <p className={ style.plan_date }>
            { dateHelper(plan.lastModified).format("DD-MM-YYYY, HH:mm") }
         </p>

      </div>
   );
});
