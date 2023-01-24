import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { resetPasswordValidator } from "../../../../validator/auth.validator";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService, type AxiosApiError } from "../../../../services";
import { resetFields } from "../../../../helper/reset-fIelds.helper";

import style from "./Reset-Password-Form.module.scss";
import { catchErrors } from "../../../../helper/catch-errors.helper";

export const ResetPasswordForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(resetPasswordValidator),
      mode: "onTouched",
   });

   const [ searchParams, setSearchParams ] = useSearchParams();
   const resetPasswordToken = searchParams.get("token");

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      const password = data.password;
      const repeatPassword = data.repeat_password;

      try {
         if ((password && resetPasswordToken) && (password === repeatPassword)) {
            const loading = toast.loading("Зачекайте");

            const message = await authService.resetPassword(password, resetPasswordToken!);

            toast.dismiss(loading);
            toast.success(message);

            setTimeout(() => {
               resetFields(setValue);
               navigate("/login");
            }, 1500);

         } else {
            toast.error("Паролі не співпадають");
         }

      } catch (e) {
         catchErrors(e)
      }
   };

   return (
      <form className={ style.ResetPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Введіть ваш новий пароль" }
                      fieldName={ "password" }
                      register={ register }
                      errorMessage={ errors.password?.message }
                      isPassword={ true }
         />

         <FormControl labelName={ "Введіть пароль ще раз" }
                      fieldName={ "repeat_password" }
                      register={ register }
                      errorMessage={ errors.repeat_password?.message }
                      isPassword={ true }
         />

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
