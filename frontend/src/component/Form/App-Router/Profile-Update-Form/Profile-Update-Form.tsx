import React, { FC, useEffect } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { updateProfile } from "../../../../validator/user.validator";
import { userService } from "../../../../services";
import { useAppSelector } from "../../../../hook/redux.hook";
import { catchErrors } from "../../../../helper/catch-errors.helper";

import style from "./Profile-Update-Form.module.scss";

export const ProfileUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(updateProfile),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.authReducer);

   useEffect(() => {
      setValue("username", username);
      setValue("name", name ? name : undefined);
      setValue("surname", surname ? surname : undefined);

   }, [ username, name, surname ]);

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         const message = await userService.profileUpdate(data);

         toast.dismiss(loading);
         toast.success(message, { duration: 5000 });

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <form className={ style.ProfileUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Ім'я користувача" } fieldName={ "username" }
                      errorMessage={ errors.username?.message } isPassword={ false }
                      register={ register }/>
         <FormControl labelName={ "Ім'я" } fieldName={ "name" }
                      errorMessage={ errors.name?.message } isPassword={ false }
                      register={ register }/>
         <FormControl labelName={ "Фамілія" } fieldName={ "surname" }
                      errorMessage={ errors.surname?.message } isPassword={ false }
                      register={ register }/>

         {/* Submit button */ }
         <button> Зберегти</button>

      </form>
   );
};
