import React, { FC, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { IMoment } from "../../../interface";
import { config } from "../../../config/config";
import { v4 } from "uuid";
import { momentService } from "../../../service";
import { catchErrors } from "../../../helper";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { momentActions } from "../../../redux/slice";
import * as dateHelper from "moment";
import { message } from "antd";
import getMomentService from "../../../service/moment/get-moment.service";
import uploadMomentImageService from "../../../service/moment/upload-moment-image.service";
import updateMomentService from "../../../service/moment/update-moment.service";

import no_photo from "../../../asset/no-photo.png";
import style from "./Moment-Item-Page.module.scss";


export const MomentItemPage: FC = () => {
   const { momentId } = useParams<{ momentId: IMoment["id"] }>();

   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const [ messageApi, contextHolder ] = message.useMessage();

   const { activeMoment } = useAppSelector(state => state.momentReducer);

   const date = dateHelper(activeMoment?.date).format("YYYY-MM-DD");

   // Async hooks
   const { prevState, setPrevState } = getMomentService(momentId!, messageApi);
   const { uploadPhotoFn } = uploadMomentImageService(messageApi);
   const { updateMomentFn } = updateMomentService(setPrevState, messageApi);

   // Define useStates
   const [ tagValue, setTagValue ] = useState<string>("");
   const [ isTagInputVisible, setIsTagInputVisible ] = useState<boolean>(false);
   const [ isTitleInputVisible, setIsTitleInputVisible ] = useState<boolean>(false);
   const [ isLocationInputVisible, setIsLocationInputVisible ] = useState<boolean>(false);
   const [ isDateInputVisible, setIsDateInputVisible ] = useState<boolean>(false);

   // Inputs handler
   const handleInputs = (field: string, value: string) => {
      const updatedMoment = {
         ...activeMoment,
         [field]: value,
      } as IMoment;

      dispatch(momentActions.setActiveMoment(updatedMoment));
   };

   // Add tag
   const addTag = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!tagValue.trim()) return;
      dispatch(momentActions.addTag({ tagValue }));
      setTagValue("");
      await closeInputsAndSave();
   };

   // Delete moment
   const deleteMoment = async () => {
      try {
         await momentService.deleteMoment(momentId!);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         navigate("/moments");
      } catch (e) {
         catchErrors(e);
      }
   };

   // Set moment date
   const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value).getTime();
      dispatch(momentActions.setDate(date));
   };

   // Upload photo
   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();
   const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => uploadPhotoFn(event, momentId!);

   // Update photo
   const updateMoment = async () => updateMomentFn(activeMoment!);

   // Delete tag
   const deleteTag = (tagValue: string) => dispatch(momentActions.deleteTag({ tagValue }));

   // Show input
   const showInput = (value: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => {
      closeInputsAndSave();
      dispatch(!value);
   };

   // On key down function
   const keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") closeInputsAndSave();
   };

   // Close all inputs and save the moment state
   const closeInputsAndSave = () => {
      setIsDateInputVisible(false);
      setIsLocationInputVisible(false);
      setIsTitleInputVisible(false);
      setIsTagInputVisible(false);
   };

   return (
      <div className={ style.MomentItemPage }>
         {contextHolder}

         { activeMoment &&
            <div className={ style.moment_item }>
               { (prevState !== activeMoment) &&
                  <p className={ style.save_moment } onClick={ updateMoment }> Зберегти </p>
               }
               <p className={ style.delete_moment } onClick={ deleteMoment }> Видалити </p>

               {/* Title */ }
               { activeMoment.title &&
                  <p onClick={ () => showInput(isTitleInputVisible, setIsTitleInputVisible) }
                     className={ style.title }>
                     { activeMoment.title }
                  </p>
               }

               {/* Title input */ }
               { isTitleInputVisible &&
                  <input className={ style.title_input }
                         type="text"
                         autoFocus
                         value={ activeMoment.title }
                         onKeyDown={ keyDownHandler }
                         onChange={ event => handleInputs("title", event.target.value) }/>
               }

               {/* Photo wrapper */ }
               <div className={ style.photo_wrapper }>
                  <input className={ style.upload_photo_input }
                         type={ "file" }
                         ref={ filePicker }
                         onChange={ uploadPhoto }/>

                  {/* Photo */ }
                  { activeMoment.photo
                     ?
                     <>
                        <img className={ style.photo_background }
                             src={ config.SERVER_URL + activeMoment.photo }
                             alt="background"
                             onClick={ closeInputsAndSave }/>

                        <img onClick={ handlePick }
                             className={ style.photo }
                             src={ config.SERVER_URL + activeMoment.photo }
                             alt="photo"/>
                     </>
                     :
                     <img onClick={ handlePick }
                          className={ style.no_image }
                          src={ no_photo }
                          alt="no_image"/>
                  }
               </div>

               {/* Date and location wrapper */ }
               <div className={ style.date_and_location_wrapper }>

                  {/* Location */ }
                  { activeMoment.location &&
                     <p onClick={ () => showInput(isLocationInputVisible, setIsLocationInputVisible) }
                        className={ style.location }> { activeMoment.location } </p>
                  }

                  {/* Location input */ }
                  { isLocationInputVisible &&
                     <input className={ style.location_input }
                            type="text"
                            autoFocus
                            value={ activeMoment.location }
                            onChange={ event => handleInputs("location", event.target.value) }
                            onKeyDown={ keyDownHandler }
                     />
                  }

                  {/* Date */ }
                  { activeMoment.date &&
                     <p onClick={ () => showInput(isDateInputVisible, setIsDateInputVisible) }
                        className={ style.date }> { dateHelper(activeMoment.date).format("DD-MM-YYYY") } </p>
                  }

                  {/* Date input */ }
                  { isDateInputVisible &&
                     <input className={ style.date_input }
                            type="date"
                            autoFocus
                            defaultValue={ date }
                            onChange={ setDate }
                            onKeyDown={ keyDownHandler }
                     />
                  }
               </div>

               {/* Tags wrapper */ }
               <div className={ style.tags_wrapper }>
                  { activeMoment.tags.length < 2 &&
                     <p onClick={ () => showInput(isTagInputVisible, setIsTagInputVisible) }
                        className={ style.add_tag }> + </p>
                  }

                  {/* Tags */ }
                  { activeMoment.tags.map(tag => (
                     <p onClick={ () => deleteTag(tag) } className={ style.tag } key={ v4() }> { tag } </p>
                  )) }

                  {/* Tag input */ }
                  { isTagInputVisible &&
                     <input className={ style.tag_input }
                            type="text"
                            autoFocus
                            value={ tagValue }
                            onChange={ event => setTagValue(event.target.value) }
                            onKeyDown={ event => addTag(event) }
                     />
                  }

               </div>

            </div>
         }
      </div>
   );
};
