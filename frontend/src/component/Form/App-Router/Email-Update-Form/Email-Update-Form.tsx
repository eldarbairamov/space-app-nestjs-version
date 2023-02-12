import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast from "react-hot-toast";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { emailValidator } from "../../../../validator/auth.validator";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../../services";
import { catchErrors } from "../../../../helper";

import style from "./Email-Update-Form.module.scss";

export const EmailUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });
   
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<{ email: string }> = async (data): Promise<void> => {
      try {
         const loading = toast.loading("Зачекайте...");

         await userService.changeEmailRequest({ email: data.email! });

         toast.dismiss(loading);
         toast.success("Лист із посиланням на підтведження вже летить на вказану електронну пошту", { duration: 5000 });

         setTimeout(() => {
            setValue("email", "");
            navigate("/");
         }, 5000);

      } catch (e) {
         catchErrors(e);
      }
   };

   return (
      <form className={ style.EmailUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Form controls */ }
         <FormControl labelName={ "Введіть нову адресу електронної пошти" }
                      fieldName={ "email" }
                      register={ register }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
