import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { IRegistration, IRegistrationForm } from "../../../interface";
import { FormControl } from "../../UI/Form-Control/Form-Control";
import { registrationValidator } from "../../../validator/auth.validator";
import { WelcomeRouter } from "../../../router";
import { Button } from "../../../component";

import style from "./Registration-Form.module.scss";

interface IRegistrationFormProps {
   registrationFn: (body: IRegistration) => Promise<void>;
}

export function RegistrationForm({ registrationFn }: IRegistrationFormProps) {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<IRegistrationForm>({
      resolver: joiResolver(registrationValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => registrationFn(data);

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
         <Button disabled={ !isValid } text={ "Зареєструватись" } style={ { width: "100%" } }/>

         {/*  Footer */ }
         <div className={ style.footer }>
            <span> Є аккаунт? </span>
            <span onClick={ () => WelcomeRouter.navigate("/login") }> Увійти </span>
         </div>

      </form>
   );
}

