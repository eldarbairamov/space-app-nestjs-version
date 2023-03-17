import { useState } from "react";

import { useParams } from "react-router-dom";
import { IMoment } from "@src/interface";
import { useAppSelector } from "@src/hook";
import { AppRouter } from "@src/router";
import { deleteMomentService, getMomentService, updateMomentService, uploadMomentPhotoService, activeMomentService } from "@src/service";
import dateHelper from "moment";
import { motion } from "framer-motion";
import { configuration } from "@src/config/configuration";
import { Loader, Modal } from "@src/component";

import style from "./Moment-Active-Page.module.scss";
import noImageLight from "/no-image-light.svg";
import noImageDark from "/no-image-dark.svg";

export function MomentActivePage() {
   const { momentId } = useParams<{ momentId: IMoment["id"] }>();

   const { activeMoment, isLoading } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const [ isOpen, setIsOpen ] = useState<boolean>(false);
   const toggleModal = () => !isLoading && setIsOpen(!isOpen)

   const { prevState, setPrevState } = getMomentService(momentId!);
   const { uploadPhotoFn } = uploadMomentPhotoService();
   const { updateMomentFn } = updateMomentService(setPrevState);
   const { deleteMomentFn } = deleteMomentService(() => AppRouter.navigate("/moments"));
   const { setDate, handleInputs, handlePick, filePicker, handleTag } = activeMomentService(activeMoment);

   return (
      <motion.div className={ style.MomentActivePage }
                  initial={ { x: -10 } }
                  animate={ { x: 0 } }
      >

         { activeMoment &&
            <div className={ style.active_moment }>

               {/* Save and delete wrapper */ }
               <div className={ style.save_delete_wrapper }>
                  <p className={ style.delete_moment } onClick={ () => deleteMomentFn(momentId!) }> Видалити </p>
                  { (prevState !== activeMoment) &&
                     <p className={ style.save_moment } onClick={ () => updateMomentFn(activeMoment!) }> Зберегти </p> }
               </div>

               {/* Title */ }
               <input className={ style.title }
                      type="text"
                      placeholder={ 'Новий момент' }
                      value={ activeMoment.title }
                      style={ { minWidth: activeMoment.title.length * 10 } }
                      onChange={ event => handleInputs("title", event.target.value) }/>


               {/* Photo wrapper */ }
               <div className={ style.photo_wrapper }>
                  <input className={ style.upload_photo_input }
                         type={ "file" }
                         ref={ filePicker }
                         onChange={ event => uploadPhotoFn(event, momentId!) }/>

                  {/* Photo */ }
                  { activeMoment.photo
                     ?
                     <>
                        <img className={ style.photo_background }
                             src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                             alt="background"/>

                        <img onClick={ handlePick }
                             className={ style.photo }
                             src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                             alt="photo"/>
                     </>
                     :
                     <img onClick={ handlePick }
                          className={ style.no_image }
                          src={ isDark ? noImageLight : noImageDark }
                          alt="no_image"/>
                  }
               </div>

               {/* Date and location wrapper */ }
               <div className={ style.date_and_location_wrapper }>

                  {/* Location */ }
                  <input className={ style.location }
                         style={ { minWidth: activeMoment.location.length * 10 } }
                         type="text"
                         placeholder={ 'Локація' }
                         value={ activeMoment.location }
                         onChange={ event => handleInputs("location", event.target.value) }
                  />

                  {/* Date */ }
                  <input className={ style.date }
                         type="date"
                         defaultValue={ dateHelper(activeMoment.date).format("YYYY-MM-DD") }
                         onChange={ setDate }
                  />

               </div>

               {/* Tag wrapper */ }
               <div className={ style.tag_wrapper }>
                  <input className={ style.tag }
                         style={ { minWidth: activeMoment.tag.length * 10 } }
                         type="text"
                         value={ activeMoment.tag }
                         placeholder={ 'тег' }
                         onChange={ handleTag }
                  />

               </div>

            </div>
         }

         <Modal isOpen={ isLoading } onClose={ toggleModal } isBg={ false }>
            <Loader/>
         </Modal>

      </motion.div>
   );
}
