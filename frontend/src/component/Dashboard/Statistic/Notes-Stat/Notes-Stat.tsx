import React, { type FC, useEffect, useState } from "react";

import { Divider } from "antd";
import { noteService } from "../../../../services";
import { catchErrors } from "../../../../helper";

import style from "./Notes-Stat.module.scss";

export const NotesStat: FC = () => {
   const [count, setCount] = useState<number>()

   useEffect(() => {
      noteService.getNotesCount()
         .then(res => setCount(res.data))
         .catch(e => catchErrors(e))
   }, []);

   return (
      <div className={ style.NotesStat }>
         <Divider> <span>Замітки</span> </Divider>
         <p> { count } </p>
      </div>
   );
};
