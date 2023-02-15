import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { loginValidator } from "../../../../validator/auth.validator";
import { ILoginForm } from "../../../../interface";
import { message } from "antd";
import { WelcomeRouter } from "../../../../router";
import loginService from "../../../../service/auth/login.service";

import style from "./Login-Form.module.scss";

export const LoginForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>({
      resolver: joiResolver(loginValidator),
      mode: "onTouched",
   });

   const [ messageApi, contextHolder ] = message.useMessage();

   const { loginFn } = loginService(messageApi, () => WelcomeRouter.navigate(0));

   const onSubmit: SubmitHandler<ILoginForm> = async (data) => loginFn(data);

   return (
      <form className={ style.LoginForm } onSubmit={ handleSubmit(onSubmit) }>
         { contextHolder }

         {/* Form controls */ }
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

         {/* Submit button*/ }
         <button disabled={ !isValid }> Увійти</button>

         {/* Footer */ }
         <div className={ style.footer }>
            <p onClick={ () => WelcomeRouter.navigate("/password_forgot") }> Забув пароль? </p>
            <p onClick={ () => WelcomeRouter.navigate("/registration") }> Створити аккаунт </p>
         </div>

      </form>
   );
};
