import React, { FC, useEffect, useState } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast, { Toaster } from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { updateProfile } from "../../../../validator/user.validator";
import { type AxiosApiError, userService } from "../../../../services";
import { useAppDispatch, useAppSelector } from "../../../../hook/redux.hook";
import { asyncAuthActions } from "../../../../redux/slice/auth.slice";

import style from "./Profile-Update-Form.module.scss";

export const ProfileUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(updateProfile),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.authReducer);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(asyncAuthActions.getUserInfo())
   }, []);

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
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
      }
   };

   return (
      <form className={ style.ProfileUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

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
