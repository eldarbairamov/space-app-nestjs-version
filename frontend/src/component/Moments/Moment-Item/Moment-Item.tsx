import React, { FC } from "react";

import { IMoment } from "../../../interface";
import { v4 } from "uuid";
import { config } from "../../../config/config";
import { AppRouter } from "../../../router";

import style from "./Moment-Item.module.scss";
import no_photo from "../../../asset/no-photo.png";

interface IMomentItem {
   moment: IMoment;
}

export const MomentItem: FC<IMomentItem> = ({ moment }) => {

   return (
      <div className={ style.MomentItem } onClick={ () => AppRouter.navigate(`/moments/${ moment.id }`) }>
         {/* Title */ }
         <p className={ style.title }> { moment.title } </p>

         {/* Photo */ }
         { moment.photo ?
            <>
               <img className={ style.photo_background } src={ config.SERVER_URL + moment.photo }
                    alt="background"/>
               <img className={ style.photo } src={ config.SERVER_URL + moment.photo } alt="photo"/>
            </>
            :
            <img className={ style.no_image } src={ no_photo } alt="no_image"/>
         }

         {/* Date nad location wrapper */ }
         <div className={ style.date_and_location_wrapper }>
            { moment.location && <p className={ style.location }> { moment.location } </p> }
            { moment.date && <p className={ style.date }> { new Date(moment.date).toLocaleDateString("en-GB") } </p> }
         </div>

         {/* Tags wrapper */ }
         <div className={ style.tags_wrapper }>
            { moment.tags.map(tag => <p key={ v4() } className={ style.tag }> { tag } </p>) }
         </div>

      </div>
   );
};
