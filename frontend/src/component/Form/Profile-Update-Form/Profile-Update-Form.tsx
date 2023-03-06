import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { updateProfile } from "../../../validator/user.validator";
import { useAppSelector } from "../../../hook";
import { IUpdateProfileForm } from "../../../interface";
import { message } from "antd";
import { getUserService, updateProfileService } from "../../../service";
import { Button } from "../../../component";

import style from "./Profile-Update-Form.module.scss";

export function ProfileUpdateForm() {
   const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUpdateProfileForm>({
      resolver: joiResolver(updateProfile),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { updateEmailFn } = updateProfileService(messageApi);
   const { getUserFn } = getUserService(messageApi);

   const { username, name, surname } = useAppSelector(state => state.userReducer);

   useEffect(() => {
      if (!(username && name && username)) getUserFn();

      setValue("username", username);
      setValue("name", name ? name : undefined);
      setValue("surname", surname ? surname : undefined);

   }, [ username, name, surname ]);

   const onSubmit: SubmitHandler<IUpdateProfileForm> = async (data) => updateEmailFn(data);

   return (
      <form className={ style.ProfileUpdateForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

         {/* Form controls */ }
         <FormControl labelName={ "Ім'я користувача" }
                      fieldName={ "username" }
                      errorMessage={ errors.username?.message }
                      isPassword={ false }
                      register={ register }/>

         <FormControl labelName={ "Ім'я" }
                      fieldName={ "name" }
                      errorMessage={ errors.name?.message }
                      isPassword={ false }
                      register={ register }/>

         <FormControl labelName={ "Фамілія" }
                      fieldName={ "surname" }
                      errorMessage={ errors.surname?.message }
                      isPassword={ false }
                      register={ register }/>

         {/* Submit button */ }
         <Button text={ "Зберегти" } style={ { width: "100%" } }/>

      </form>
   );
}
