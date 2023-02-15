import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { registrationValidator } from "../../../../validator/auth.validator";
import { IRegistrationForm } from "../../../../interface";
import { message } from "antd";
import { WelcomeRouter } from "../../../../router";
import registrationService from "../../../../service/auth/registration.service";

import style from "./Registration-Form.module.scss";

export const RegistrationForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IRegistrationForm>({
      resolver: joiResolver(registrationValidator),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { registrationFn } = registrationService(messageApi, () => WelcomeRouter.navigate("/registration_success", { replace: true }))

   const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => registrationFn(data)

   return (
      <form className={ style.RegistrationForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

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
            <a onClick={ () => WelcomeRouter.navigate("/login") }> Увійти </a>
         </div>

      </form>
   );
};

