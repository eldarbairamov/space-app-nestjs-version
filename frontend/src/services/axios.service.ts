import axios, { type AxiosResponse, type AxiosError, type AxiosRequestConfig } from "axios";
import { config } from "../config/config";
import { createBrowserHistory } from "history";
import { storageService } from "./storage.service";

export const history = createBrowserHistory();
export type AxiosApiError = AxiosError<{ message: string, status: number }>
export type AxiosRes<T> = Promise<AxiosResponse<T>>

export const axiosInstance = axios.create({ baseURL: config.API_URL });

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
   const accessToken = storageService.getAccessToken();

   if (accessToken) { // @ts-ignore
      config.headers.Authorization = `Bearer ${ accessToken }`;
   }

   return config;
});

axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      return config;
   },
   (e) => {
      const axiosError = e as AxiosApiError;

      if (axiosError.response?.status === 401 && axiosError.response?.data.message === 'Користувач не авторизований') {
         throw new Error("Ви не авторизовані");
      }

      if (axiosError.response?.status === 401 && axiosError.response?.data.message === 'Токен не валідний') {
         throw new Error("Токен не валідний");
      }

      throw new Error("Не передбачена помилка... Спробуйте пізніше");
   });