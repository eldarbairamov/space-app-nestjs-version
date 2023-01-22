import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import toast, { Toaster } from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService, type AxiosApiError } from "../../../../services";
import { registrationValidator } from "../../../../validator/auth.validator";
import { resetFields } from "../../../../helper/reset-fIelds.helper";

import style from "./Registration-Form.module.scss";

export const RegistrationForm: FC = () => {
      const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
         resolver: joiResolver(registrationValidator),
         mode: "onTouched",
      });

      const navigate = useNavigate();

      const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data) => {
         try {
            const loading = toast.loading("Зачекайте...");
            const message = await authService.userRegistration(data);

            toast.dismiss(loading);
            toast.success(`${ message }. Посилання на активацію аккаунту вже летить на вашу електронну пошту ;)`, {
               duration: 5000,
            });

            setTimeout(() => {
               resetFields(setValue);
               navigate("/activation");
            }, 5000);

         } catch (e) {
            const axiosError = e as AxiosApiError;
            const response = axiosError.response?.data.message as string;

            toast.dismiss();
            toast.error(response ? response : axiosError.message);
         }
      };

      return (
         <form className={ style.RegistrationForm } onSubmit={ handleSubmit(onSubmit) }>

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

            {/* FormControlDate fields */ }
            <FormControl labelName={ "Ім'я користувача" } fieldName={ "username" } register={ register }
                         errorMessage={ errors.username?.message } isPassword={ false }/>
            <FormControl labelName={ "Електронна пошта" } fieldName={ "email" } register={ register }
                         errorMessage={ errors.email?.message } isPassword={ false }/>
            <FormControl labelName={ "Пароль" } fieldName={ "password" } register={ register }
                         errorMessage={ errors.password?.message } isPassword={ true }/>

            {/* Submit button */ }
            <button disabled={ !isValid }> Зареєструватись</button>

            {/*  Footer */ }
            <div className={ style.footer }>
               <p> Є аккаунт? </p>
               <a onClick={ () => navigate("/login") }> Увійти </a>
            </div>

         </form>
      );
   }
;

