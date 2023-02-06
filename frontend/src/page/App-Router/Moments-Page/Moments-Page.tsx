import React, { FC } from "react";

import style from "./Moments-Page.module.scss";
import add from "../../../asset/note.png";
import photo from "../../../asset/photo.jpg";

export const MomentsPage: FC = () => {

   return (
      <div className={ style.MemoriesPage }>
         <div className={ style.header }>
            <div className={ style.save_moment }>
               <img src={ add } alt={ "add" }/>
               <button> Зберегти момент</button>
            </div>
         </div>

         <div className={ style.main }>
            <div className={ style.moments_list }>

               <div className={ style.moments_item }>
                  <div className={ style.photo_wrapper }>
                     <img className={ style.photo_background } src={ photo } alt="background"/>
                     <img className={ style.photo } src={ photo } alt="photo"/>
                  </div>

                  <p className={ style.title }> Лифтолук </p>
                  <p className={ style.date }> 12.06.2022</p>

                  <div className={ style.tags_wrapper }>
                     <p className={ style.tag }>family</p>
                     <p className={ style.tag }>traveling</p>
                  </div>
               </div>


            </div>
         </div>

      </div>
   );
};
