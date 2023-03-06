import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { authRequests, configuration } from "../config/configuration";
import { storageService } from "./storage.service";
import { AppRouter } from "../router";
import { IOAuth } from "../interface";

export type AxiosApiError = AxiosError<{ message: string, status: number }>

export const axiosInstance = axios.create({ baseURL: configuration.API_URL });

let isRefreshing = false;

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
   async (e) => {
      const axiosError = e as AxiosApiError;
      const refreshToken = storageService.getRefreshToken();

      if (axiosError.response?.status === 401 && refreshToken && !isRefreshing) {
         isRefreshing = true;

         try {
            const { data } = await axiosInstance.post<Omit<IOAuth, "username">>(authRequests.refresh, { refreshToken });
            storageService.setTokens(data.accessToken, data.refreshToken);
            isRefreshing = false

         } catch (e) {
            storageService.deleteTokens();
            AppRouter.navigate("/", { state: { status: "unauthorized" }, replace: true });
            AppRouter.navigate(0);
         }

         return axiosInstance(e.config);
      }

      if (axiosError.message === "Network Error") {
         throw new Error(`Непередбачена помилка: ${ axiosError.message }`);
      }

      return Promise.reject(e);
   });