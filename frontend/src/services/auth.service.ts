import { type IOAuthDto, type IUserDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { storageService } from "./storage.service";
import { type AxiosResponse } from "axios";

export const authService = {

   registration: async (dto: Partial<IUserDto>): Promise<AxiosResponse> => {
      return axiosInstance.post("/auth/registration", dto);
   },

   login: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<IOAuthDto>("/auth/login", dto);

      storageService.setAccessToken(result.data.accessToken);

      return result.data.tokenOwnerUsername;
   },

   forgotPassword: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>("auth/password_forgot", dto);

      return result.data.message;
   },

   accountActivation: async (activationCode: string): Promise<AxiosResponse> => {
      const activationDto = { activationCode };

      return axiosInstance.post("/auth/activation", activationDto);
   },

   resetPassword: async (password: string, resetPasswordToken: string): Promise<AxiosResponse> => {
      const forgotPasswordDto = { resetPasswordToken, password };

      return axiosInstance.post("/auth/password_reset", forgotPasswordDto);
   },

   logout: async () => {
      const accessToken = localStorage.getItem("accessToken");

      await axiosInstance.get("/auth/logout", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      storageService.deleteAccessToken();
   },

};