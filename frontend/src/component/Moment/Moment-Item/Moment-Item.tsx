import { forwardRef } from "react";

import { IMoment } from "@src/interface";
import { v4 } from "uuid";
import { configuration } from "@src/config/configuration";
import { AppRouter } from "@src/router";
import dateHelper from "moment/moment";
import { useAppSelector } from "@src/hook";

import style from "./Moment-Item.module.scss";
import noImageLight from "@src/asset/no-image-light.svg";
import noImageDark from "@src/asset/no-image-dark.svg";

interface IMomentItem {
   moment: IMoment;
}

export const MomentItem = forwardRef(({ moment }: IMomentItem, ref: any) => {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div ref={ ref } className={ style.MomentItem } onClick={ () => AppRouter.navigate(`/moments/${ moment.id }`) }>

         {/* Title */ }
         <p className={ style.title }> { moment.title } </p>

         {/* Photo */ }
         { moment.photo ?
            <>
               <img className={ style.photo_background }
                    src={ configuration.SERVER_URL + moment.photo }
                    alt="background"
               />
               <img className={ style.photo }
                    src={ configuration.SERVER_URL + moment.photo }
                    alt="photo"
               />
            </>
            :
            <img className={ style.no_image }
                 src={ isDark ? noImageLight : noImageDark }
                 alt="no_image"
            />
         }

         {/* Date nad location wrapper */ }
         <div className={ style.date_and_location_wrapper }>
            { moment.location && <p className={ style.location }> { moment.location } </p> }
            { moment.date && <p className={ style.date }> { dateHelper(moment.date).format("DD-MM-YYYY") } </p> }
         </div>

         {/* Tags wrapper */ }
         <div className={ style.tags_wrapper }>
            { moment.tags.map(tag => <p key={ v4() } className={ style.tag }> { tag } </p>) }
         </div>

      </div>
   );
});
