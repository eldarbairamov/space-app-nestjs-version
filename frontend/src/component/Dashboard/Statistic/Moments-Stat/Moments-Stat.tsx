import React, { FC, useState } from "react";

import { Divider } from "antd";

import style from "./Moments-Stat.module.scss";
import { useQuery } from "@tanstack/react-query";
import { momentService } from "../../../../services";
import { catchErrors } from "../../../../helper";

export const MomentsStat: FC = () => {
   const [ count, setCount ] = useState<number>();

   useQuery({
      queryKey: [ "moments count" ],
      queryFn: () => momentService.getMomentsCount(),
      onSuccess: ({ data }) => setCount(data),
      onError: (err) => catchErrors(err),
   });

   return (
      <div className={ style.MomentsStat }>
         <Divider> <span>Моменти</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
