import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { ILoginForm } from "@src/interface";
import { FormControl } from "@src/component";
import { loginValidator } from "@src/validator/auth.validator";
import { UnauthorizedRouter } from "@src/router";
import { Button } from "@src/component";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";

import style from "./Login-Form.module.scss";

interface ILoginFormProps {
   loginFn: (body: ILoginForm) => Promise<void>;
}

export function LoginForm({ loginFn }: ILoginFormProps) {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>({
      resolver: joiResolver(loginValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<ILoginForm> = async (data) => loginFn(data);

   return (
      <motion.form className={ style.LoginForm }
                   onSubmit={ handleSubmit(onSubmit) }
                   variants={ horizontalPresent }
                   initial={ "initial" }
                   animate={ "animate" }>

         <FormControl labelName={ "Електронна пошта" }
                      fieldName={ "email" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.email?.message }
                      isPassword={ false }/>

         <FormControl labelName={ "Пароль" }
                      fieldName={ "password" }
                      register={ register }
                      isRequired={ true }
                      errorMessage={ errors.password?.message }
                      isPassword={ true }/>

         <Button disabled={ !isValid }
                 style={ { width: "100%" } }
                 text={ "Увійти" }/>

         <div className={ style.footer }>
            <p onClick={ () => UnauthorizedRouter.navigate("/password_forgot", { replace: true }) }> Забув пароль? </p>
            <p onClick={ () => UnauthorizedRouter.navigate("/registration", { replace: true }) }> Створити аккаунт </p>
         </div>

      </motion.form>
   );
}
