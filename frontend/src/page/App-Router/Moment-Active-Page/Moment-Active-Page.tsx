import { useParams } from "react-router-dom";
import { IMoment } from "@src/interface";
import { v4 } from "uuid";
import { useAppSelector } from "@src/hook";
import { FloatButton, Tooltip } from "antd";
import { AppRouter } from "@src/router";
import { deleteMomentService, getMomentService, updateMomentService, uploadMomentImageService } from "@src/service";
import { QuestionCircleOutlined } from "@ant-design/icons";
import dateHelper from "moment";
import { activeMomentService } from "@src/service/moment/active-moment.service";
import { motion } from "framer-motion";
import { configuration } from "@src/config/configuration";

import style from "./Moment-Active-Page.module.scss";
import noImageLight from "@src/asset/no-image-light.svg";
import noImageDark from "@src/asset/no-image-dark.svg";
import { Loader } from "@src/component/UI/Loader/Loader";

export function MomentItemPage() {
   const text = <span> Щоб закрити поле редагування - клацай enter </span>;

   const { momentId } = useParams<{ momentId: IMoment["id"] }>();

   const { activeMoment, isLoading } = useAppSelector(state => state.momentReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const { prevState, setPrevState } = getMomentService(momentId!);
   const { uploadPhotoFn } = uploadMomentImageService();
   const { updateMomentFn } = updateMomentService(setPrevState);
   const { deleteMomentFn } = deleteMomentService(() => AppRouter.navigate("/moments"));
   const {
      tagValue, setTagValue, setIsTagInputVisible, setIsTitleInputVisible, isDateInputVisible,
      setIsLocationInputVisible, setIsDateInputVisible, isLocationInputVisible, isTitleInputVisible,
      setDate, isTagInputVisible, addTag, closeInputsAndSave, showInput, handleInputs, handlePick,
      deleteTag, keyDownHandler, filePicker
   } = activeMomentService(activeMoment);

   return (
      <>
         <motion.div className={ style.MomentActivePage }
                     initial={ { x: -10 } }
                     animate={ { x: 0 } }
         >

            { isLoading ? <Loader/> :
               <>
                  { activeMoment &&
                     <div className={ style.active_moment }>
                        { (prevState !== activeMoment) &&
                           <p className={ style.save_moment }
                              onClick={ () => updateMomentFn(activeMoment!) }> Зберегти </p> }
                        <p className={ style.delete_moment } onClick={ () => deleteMomentFn(momentId!) }> Видалити </p>

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
                                  onChange={ event => uploadPhotoFn(event, momentId!) }/>

                           {/* Photo */ }
                           { activeMoment.photo ?
                              <>
                                 <img className={ style.photo_background }
                                      src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                                      alt="background"
                                      onClick={ closeInputsAndSave }/>

                                 <img onClick={ handlePick }
                                      className={ style.photo }
                                      src={ `${ configuration.API_URL }/${ activeMoment.photo }` }
                                      alt="photo"/>
                              </> :
                              <img onClick={ handlePick }
                                   className={ style.no_image }
                                   src={ isDark ? noImageLight : noImageDark }
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
                                     defaultValue={ dateHelper(activeMoment?.date).format("YYYY-MM-DD") }
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
               </>
            }

         </motion.div>
         <Tooltip color={ isDark ? "#2d2f33" : "whitesmoke" }
                  placement="topLeft"
                  title={ text }
                  trigger={ "click" }
         >
            <FloatButton icon={ <QuestionCircleOutlined/> }
                         type="primary"
                         style={ { right: 24 } }/>

         </Tooltip>
      </>
   );
}
