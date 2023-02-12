import React, { FC, useState } from "react";

import { Divider } from "antd";
import { catchErrors } from "../../../../helper";
import { planService } from "../../../../services";
import { useQuery } from "@tanstack/react-query";

import style from "./Plans-Stat.module.scss";

export const PlansStat: FC = () => {
   const [ count, setCount ] = useState<number>();

   useQuery({
      queryKey: [ "plans count" ],
      queryFn: () => planService.getPlansCount(),
      onSuccess: ({ data }) => setCount(data),
      onError: (err) => catchErrors(err),
   });

   return (
      <div className={ style.PlansStat }>
         <Divider> <span>Плани</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
