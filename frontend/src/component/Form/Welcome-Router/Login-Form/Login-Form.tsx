import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { type IUserDto } from "../../../../interface";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { authService, type AxiosApiError } from "../../../../services";
import { loginValidator } from "../../../../validator/auth.validator";
import { resetFields } from "../../../../helper/reset-fIelds.helper";

import style from "./Login-Form.module.scss";
import { useAppDispatch } from "../../../../hook/redux.hook";
import { catchErrors } from "../../../../helper/catch-errors.helper";

export const LoginForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(loginValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте");

         const username = await authService.login(data);

         toast.dismiss(loading);
         toast.success(`Привіт, ${ username }`);

         setTimeout(() => {
            resetFields(setValue);
            navigate(0);
         }, 1500);

      } catch (e) {
         const { response } = catchErrors(e);

         if (response === "Активуйте аккаунт") {
            setTimeout(() => {
               navigate("/activation");
            }, 2000);
         }
      }
   };

   return (
      <form className={ style.LoginForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Електронна пошта" } fieldName={ "email" } register={ register }
                      errorMessage={ errors.email?.message } isPassword={ false }/>
         <FormControl labelName={ "Пароль" } fieldName={ "password" } register={ register }
                      errorMessage={ errors.password?.message } isPassword={ true }/>

         {/* Submit button*/ }
         <button disabled={ !isValid }> Увійти</button>

         {/* Footer */ }
         <div className={ style.footer }>
            <p onClick={ () => navigate("/password_forgot") }> Забув пароль? </p>
         </div>

      </form>
   );
};
