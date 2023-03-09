import React, { useRef, useState } from "react";

import { momentActions } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { IMoment } from "@src/interface";
import { TypedSetState } from "@src/interface/common.interface";

export function activeMomentService(activeMoment: IMoment | null) {
   const dispatch = useAppDispatch();

   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   // Set moment date
   const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value).getTime();
      dispatch(momentActions.setDate(date));
   };

   // Show input
   const showInput = (value: boolean, dispatch: TypedSetState<boolean>) => {
      closeInputsAndSave();
      dispatch(!value);
   };

   // On key down fn
   const keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") closeInputsAndSave();
   };

   // Delete tag
   const deleteTag = (tagValue: string) => dispatch(momentActions.deleteTag({ tagValue }));

   // Inputs handler
   const handleInputs = (field: string, value: string) => {
      const updatedMoment = {
         ...activeMoment,
         [field]: value,
      } as IMoment;

      dispatch(momentActions.setActiveMoment(updatedMoment));
   };

   // Define useStates
   const [ tagValue, setTagValue ] = useState<string>("");
   const [ isTagInputVisible, setIsTagInputVisible ] = useState<boolean>(false);
   const [ isTitleInputVisible, setIsTitleInputVisible ] = useState<boolean>(false);
   const [ isLocationInputVisible, setIsLocationInputVisible ] = useState<boolean>(false);
   const [ isDateInputVisible, setIsDateInputVisible ] = useState<boolean>(false);

   // Close all inputs and save the moment state
   const closeInputsAndSave = () => {
      setIsDateInputVisible(false);
      setIsLocationInputVisible(false);
      setIsTitleInputVisible(false);
      setIsTagInputVisible(false);
   };

   // Add tag
   const addTag = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!tagValue.trim()) return;
      dispatch(momentActions.addTag({ tagValue }));
      setTagValue("");
      await closeInputsAndSave();
   };

   return {
      addTag,
      closeInputsAndSave,
      handleInputs,
      deleteTag,
      keyDownHandler,
      showInput,
      handlePick,
      setDate,
      filePicker,
      tagValue,
      isTitleInputVisible,
      isTagInputVisible,
      isLocationInputVisible,
      isDateInputVisible,
      setTagValue,
      setIsTitleInputVisible,
      setIsLocationInputVisible,
      setIsDateInputVisible,
      setIsTagInputVisible,
   };

}