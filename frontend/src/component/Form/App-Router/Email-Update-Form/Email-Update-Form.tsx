import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { emailValidator } from "../../../../validator/auth.validator";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../../services";
import { catchErrors } from "../../../../helper/catch-errors.helper";

import style from "./Email-Update-Form.module.scss";

export const EmailUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         const message = await userService.emailUpdate({ email: data.email! });

         toast.dismiss(loading);
         toast.success(message, { duration: 6000 });

         setTimeout(() => {
            navigate("/");
         }, 6000);

      } catch (e) {
         catchErrors(e)
      }
   };

   return (
      <form className={ style.EmailUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Введіть нову адресу електронної пошти" } fieldName={ "email" } register={ register }
                      errorMessage={ errors.email?.message } isPassword={ false }/>

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
