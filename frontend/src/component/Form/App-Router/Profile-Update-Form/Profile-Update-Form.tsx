import React, { FC, useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast from "react-hot-toast";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { updateProfile } from "../../../../validator/user.validator";
import { userService } from "../../../../services";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { catchErrors } from "../../../../helper";
import { userActions } from "../../../../redux/slice";
import { IUpdateProfileForm } from "../../../../interface";

import style from "./Profile-Update-Form.module.scss";

export const ProfileUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUpdateProfileForm>({
      resolver: joiResolver(updateProfile),
      mode: "onTouched",
   });

   const { username, name, surname } = useAppSelector(state => state.userReducer);
   const dispatch = useAppDispatch();

   useEffect(() => {
      setValue("username", username);
      setValue("name", name ? name : undefined);
      setValue("surname", surname ? surname : undefined);

   }, [ username, name, surname ]);

   const onSubmit: SubmitHandler<IUpdateProfileForm> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         const result = await userService.profileUpdate(data);
         dispatch(userActions.setInfo(result.data));

         toast.dismiss(loading);
         toast.success("Ви успішно оновили профіль");

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <form className={ style.ProfileUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

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
         <button> Зберегти</button>

      </form>
   );
};
