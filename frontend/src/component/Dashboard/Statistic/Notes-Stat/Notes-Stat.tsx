import React, { FC, useState } from "react";

import { Divider } from "antd";
import { noteService } from "../../../../services";
import { catchErrors } from "../../../../helper";

import style from "./Notes-Stat.module.scss";
import { useQuery } from "@tanstack/react-query";

export const NotesStat: FC = () => {
   const [ count, setCount ] = useState<number>();

   useQuery({
      queryKey: [ "notes count" ],
      queryFn: () => noteService.getNotesCount(),
      onSuccess: ({ data }) => setCount(data),
      onError: (err) => catchErrors(err),
   });

   return (
      <div className={ style.NotesStat }>
         <Divider> <span>Замітки</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
