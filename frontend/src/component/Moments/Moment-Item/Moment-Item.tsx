import React, { FC } from "react";

import { IMoment } from "../../../interface";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

import style from "./Moment-Item.module.scss";
import { config } from "../../../config/config";
import no_photo from "../../../asset/no-photo.png";

interface IMomentItem {
   moment: IMoment;
}

export const MomentItem: FC<IMomentItem> = ({ moment }) => {
   const navigate = useNavigate();

   const toMomentItem = () => {
      navigate(`/moments/${ moment.id }`);
   };

   return (
      <div className={ style.MomentItem } onClick={ toMomentItem }>

         <p className={ style.title }> { moment.title } </p>

         <div className={ style.photo_wrapper }>
            {
               moment.photo ?
                  <>
                     <img className={ style.photo_background } src={ config.SERVER_URL + moment.photo }
                          alt="background"/>
                     <img className={ style.photo } src={ config.SERVER_URL + moment.photo } alt="photo"/>
                  </>
                  :
                  <img className={ style.no_image } src={ no_photo } alt="no_image"/>
            }
         </div>

         <div className={ style.date_and_location_wrapper }>
            {
               moment.location && <p className={ style.location }> { moment.location } </p>
            }
            {
               moment.date &&
               <p className={ style.date }> { new Date(moment.date).toLocaleDateString("en-GB") } </p>
            }
         </div>

         <div className={ style.tags_wrapper }>
            {
               moment.tags.map(tag => <p key={ v4() } className={ style.tag }> { tag } </p>)
            }
         </div>

      </div>
   );
};
