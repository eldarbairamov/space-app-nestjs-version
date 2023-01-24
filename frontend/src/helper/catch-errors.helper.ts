import { AxiosApiError } from "../services";
import toast from "react-hot-toast";

export const catchErrors = (e: unknown) => {
   const axiosError = e as AxiosApiError;
   const response = axiosError.response?.data.message as string;

   toast.dismiss();
   toast.error(response ? response : axiosError.message);

   return {axiosError, response}
}