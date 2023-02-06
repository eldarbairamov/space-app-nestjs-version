import { type AxiosApiError } from "../services";
import toast from "react-hot-toast";
import { WelcomeRouter } from "../router";

export const catchErrors = (e: unknown) => {
   const axiosError = e as AxiosApiError;
   const response = axiosError.response?.data.message as string;

   if (response === "Current password is not valid") {
      toast.dismiss();
      toast.error("Невірно вказаний поточний пароль");

      return;
   }

   if (response === "Account is not activated") {
      toast.dismiss();
      toast.error("Активуйте аккаунт");

      setTimeout(() => {
         WelcomeRouter.navigate("/activation");
      }, 2000);

      return;
   }

   if (response === "Wrong email or password") {
      toast.dismiss();
      toast.error("Невірний пароль або електронна пошта");

      return;
   }

   toast.dismiss();
   toast.error("Непередбачена помилка...");
   console.log(response ? response : axiosError.message);
};