import React, { FC, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { IMoment } from "../../../interface";
import { config } from "../../../config/config";
import { v4 } from "uuid";
import { momentService } from "../../../services";
import { catchErrors } from "../../../helper";
import * as dateHelper from "moment";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { momentActions } from "../../../redux/slice";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import no_photo from "../../../asset/no-photo.png";
import style from "./Moment-Item-Page.module.scss";

export const MomentItemPage: FC = () => {
   const dispatch = useAppDispatch();
   const { momentId } = useParams<{ momentId: string }>();
   const [ prevState, setPrevState ] = useState<IMoment>();

   useQuery({
      queryKey: [ "moment list", momentId ],
      queryFn: () => momentService.getOneMoment(momentId!),
      onSuccess: ({ data }) => {
         dispatch(momentActions.setActiveMoment(data));
         setPrevState(data);
      },
      onError: (err) => catchErrors(err),
      enabled: !!momentId,
   });

   const { activeMoment } = useAppSelector(state => state.momentReducer);

   const date = dateHelper(activeMoment?.date).format("YYYY-MM-DD");
   const navigate = useNavigate();
   const filePicker = useRef<HTMLInputElement>(null);
   const handlePick = () => filePicker.current!.click();

   const [ tagValue, setTagValue ] = useState<string>("");
   const [ isTagInputVisible, setIsTagInputVisible ] = useState<boolean>(false);
   const [ isTitleInputVisible, setIsTitleInputVisible ] = useState<boolean>(false);
   const [ isLocationInputVisible, setIsLocationInputVisible ] = useState<boolean>(false);
   const [ isDateInputVisible, setIsDateInputVisible ] = useState<boolean>(false);

   const handleInputs = (field: string, value: string) => {
      const updatedMoment = {
         ...activeMoment,
         [field]: value,
      } as IMoment;

      dispatch(momentActions.setActiveMoment(updatedMoment));
   };


   const addTag = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!tagValue.trim()) return;
      dispatch(momentActions.addTag({ tagValue }));
      setTagValue("");
      await closeInputsAndSave();
   };

   const deleteMoment = async () => {
      try {
         await momentService.deleteMoment(momentId!);
         dispatch(momentActions.deleteMoment({ momentId: momentId! }));
         navigate("/moments");
      } catch (e) {
         catchErrors(e);
      }
   };

   const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value).getTime();
      dispatch(momentActions.setDate(date));
   };

   const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
         const image = (event.target.files as FileList)[0];
         const formData = new FormData();
         formData.append("photo", image);
         const imageName = await momentService.updatePhoto(momentId!, formData);
         dispatch(momentActions.setPhoto({ photo: imageName }));
      } catch (e) {
         catchErrors(e);
      }
   };

   const updateMoment = async () => {
      try {
         const clone = Object.assign({}, activeMoment) as Partial<IMoment>;
         delete clone.id;
         delete clone.createdAt;
         await momentService.updateMoment(momentId!, clone);
         setPrevState(activeMoment as IMoment);
         toast.success('Збережено')
      } catch (e) {
         catchErrors(e);
      }
   };

   const deleteTag = (tagValue: string) => dispatch(momentActions.deleteTag({ tagValue }));

   const showInput = (value: boolean, dispatch: React.Dispatch<React.SetStateAction<boolean>>) => {
      closeInputsAndSave();
      dispatch(!value);
   };

   const handleOnKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") closeInputsAndSave();
   };

   const closeInputsAndSave = () => {
      setIsDateInputVisible(false);
      setIsLocationInputVisible(false);
      setIsTitleInputVisible(false);
      setIsTagInputVisible(false);
   };

   return (
      <div className={ style.MomentItemPage }>

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
                         onKeyDown={ handleOnKeyDown }
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
                            onKeyDown={ handleOnKeyDown }
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
                            onKeyDown={ handleOnKeyDown }
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
