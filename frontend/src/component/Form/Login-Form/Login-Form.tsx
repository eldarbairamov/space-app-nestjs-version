import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { ILoginForm } from "@src/interface";
import { FormControl } from "@src/component";
import { loginValidator } from "@src/validator/auth.validator";
import { WelcomeRouter } from "@src/router";
import { Button } from "@src/component";

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
      <form className={ style.LoginForm } onSubmit={ handleSubmit(onSubmit) }>

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
         <Button disabled={ !isValid } style={ { width: "100%" } } text={ "Увійти" }/>

         {/* Footer */ }
         <div className={ style.footer }>
            <p onClick={ () => WelcomeRouter.navigate("/password_forgot", { replace: true }) }> Забув пароль? </p>
            <p onClick={ () => WelcomeRouter.navigate("/registration", { replace: true }) }> Створити аккаунт </p>
         </div>

      </form>
   );
}
