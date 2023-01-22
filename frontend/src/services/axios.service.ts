import axios, { AxiosResponse, type AxiosError } from "axios";
import { config } from "../config/config";

export type AxiosApiError = AxiosError<{ message: string, status: number }>
export type AxiosRes<T> = Promise<AxiosResponse<T>>

export const axiosInstance = axios.create({
   baseURL: config.API_URL,
});