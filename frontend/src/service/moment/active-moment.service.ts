import { useRef } from "react";

import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { IMoment } from "@src/interface";
import { TypedOnChange } from "@src/interface/common.interface";

export function activeMomentService(activeMoment: IMoment | null) {
   const dispatch = useAppDispatch();

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const setDate = (event: TypedOnChange) => {
      const date = new Date(event.target.value).getTime();
      dispatch(momentActions.setDate(date));
   };

   const handleTag = (event: TypedOnChange) => {
      dispatch(momentActions.editTag(event.target.value))
   }

   const handleInputs = (field: string, value: string) => {
      if (value.length <= 20) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch(momentActions.setActiveMoment(updatedMoment));
      }
   };


   return {
      handleInputs,
      handlePick,
      setDate,
      filePicker,
      handleTag,
   };

}