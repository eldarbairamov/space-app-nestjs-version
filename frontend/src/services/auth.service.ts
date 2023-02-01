import { type IOAuthDto, type IUserDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { storageService } from "./storage.service";
import { type AxiosResponse } from "axios";
import { authRequests } from "../config/config";

export const authService = {

   registration: async (dto: Partial<IUserDto>): Promise<AxiosResponse> => {
      return axiosInstance.post(authRequests.registration, dto);
   },

   login: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<IOAuthDto>(authRequests.login, dto);

      storageService.setAccessToken(result.data.accessToken);
      storageService.setRefreshToken(result.data.refreshToken);

      return result.data.username;
   },

   forgotPassword: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>(authRequests.forgotPassword, dto);

      return result.data.message;
   },

   accountActivation: async (activationCode: string): Promise<AxiosResponse> => {
      const activationDto = { activationCode };

      return axiosInstance.post(authRequests.accountActivation, activationDto);
   },

   resetPassword: async (password: string, resetPasswordToken: string): Promise<AxiosResponse> => {
      const forgotPasswordDto = { resetPasswordToken, password };

      return axiosInstance.post(authRequests.resetPassword, forgotPasswordDto);
   },

   logout: async () => {
      const accessToken = localStorage.getItem("accessToken");

      await axiosInstance.get(authRequests.logout, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      storageService.deleteAccessToken();
      storageService.deleteRefreshToken();
   },

};