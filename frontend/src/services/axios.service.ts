import axios, { type AxiosResponse, type AxiosError, type AxiosRequestConfig } from "axios";
import { config } from "../config/config";
import { storageService } from "./storage.service";
import { AppRouter } from "../router";

export type AxiosApiError = AxiosError<{ message: string, status: number }>
export type AxiosRes<T> = Promise<AxiosResponse<T>>

export const axiosInstance = axios.create({ baseURL: config.API_URL });

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
   const accessToken = storageService.getAccessToken();

   if (accessToken) {
      config.headers = {
         "Authorization": `Bearer ${ accessToken }`,
      };
   }

   return config;
});

axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      return config;
   },
   (e) => {
      const axiosError = e as AxiosApiError;

      if (axiosError.response?.status === 401 && axiosError.response?.data.message === "Токен невалідний") {
         storageService.deleteAccessToken();
         AppRouter.navigate("/", { state: { status: "need to login" } });
         AppRouter.navigate(0);
         throw new Error("Токен не валідний");
      }

      return Promise.reject(e)
   });