import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import toast from "react-hot-toast";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService } from "../../../../services";
import { registrationValidator } from "../../../../validator/auth.validator";
import { resetFields, catchErrors  } from "../../../../helper";
import { UserDto } from "../../../../dto";

import style from "./Registration-Form.module.scss";

export const RegistrationForm: FC = () => {
      const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<UserDto>>({
         resolver: joiResolver(registrationValidator),
         mode: "onTouched",
      });

      const navigate = useNavigate();

      const onSubmit: SubmitHandler<Partial<UserDto>> = async (data) => {
         try {
            const loading = toast.loading("Зачекайте...");
            await authService.registration(data);

            toast.dismiss(loading);
            toast.success(`Ви успішно зареєструвались. Посилання на активацію аккаунту вже летить на вказану електронну пошту`, {
               duration: 5000,
            });

            setTimeout(() => {
               resetFields(setValue);
               navigate("/activation");
            }, 5000);

         } catch (e) {
           catchErrors(e)
         }
      };

      return (
         <form className={ style.RegistrationForm } onSubmit={ handleSubmit(onSubmit) }>

            {/* FormControlDate fields */ }
            <FormControl labelName={ "Ім'я користувача" }
                         fieldName={ "username" }
                         register={ register }
                         errorMessage={ errors.username?.message } isPassword={ false }/>

            <FormControl labelName={ "Електронна пошта" }
                         fieldName={ "email" }
                         register={ register }
                         errorMessage={ errors.email?.message }
                         isPassword={ false }/>

            <FormControl labelName={ "Пароль" }
                         fieldName={ "password" }
                         register={ register }
                         errorMessage={ errors.password?.message }
                         isPassword={ true }/>

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

