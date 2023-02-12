import { IMoment } from "../interface";

export const tagsFromArray = (moments: IMoment[]): string[] => {
   const tags = moments.map(moment => {
      if (moment.tags.length) return moment.tags.map(tag => tag);
   });

   return tags.flat() as string[];
};