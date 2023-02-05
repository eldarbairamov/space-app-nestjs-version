export interface IChangePasswordForm {
   current_password: string;
   password: string;
   repeat_password: string;
}

export interface IUpdateProfileForm {
   username: string;
   name: string | undefined;
   surname: string | undefined;
}

export interface ILoginForm {
   email: string;
   password: string;
}

export interface IRegistrationForm {
   email: string;
   username: string;
   password: string;
}

export interface IResetPasswordForm {
   password: string;
   repeat_password: string;
}