import React, { type FC } from "react";

import style from './Notes-Main.module.scss'

export const NotesMain: FC = () => {

   return (
      <div className={style.Main}>
         <div className={ style.title }>
            <p> Нова замітка </p>
         </div>
         <div className={ style.textarea }>
            textarea
         </div>
      </div>
   );
};
