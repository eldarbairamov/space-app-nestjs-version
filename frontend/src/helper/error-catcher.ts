import { type AxiosApiError } from "../service";

export const errorCatherFn = (e: unknown) => {
   const axiosError = e as AxiosApiError;
   const response = axiosError.response?.data.message as string;
   let message;

   switch (response) {
      case "Current password is not valid":
         message = "Невірно вказаний поточний пароль";
         break;

      case "User with this email is already exists":
         message = "Користувач з такою електронною поштою вже існує";
         break;

      case "Account is not activated":
         message = "Активуйте аккаунт";
         break;

      case "Wrong email or password":
         message = "Невірний пароль або електронна пошта";
         break;

      case "Activation code is not valid":
         message = "Невірний код активації";
         break;

      case "User is not found":
         message = "Користувача з такою електронною поштою не існує";
         break;

      case "No such image or directory":
         message = "Непередбачена помилка.. Перезавантажте сторінку";
         break;

      default:
         message = "Непередбачена помилка..";
         break;
   }

   console.log(response ? response : axiosError.message);

   return message;
};
