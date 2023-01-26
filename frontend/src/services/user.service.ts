import { type IUserDto, type IUserInfoDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";

export const userService = {

   profileUpdate: async (dto: Partial<IUserDto>): Promise<AxiosResponse> => {
      return  axiosInstance.patch<{ message: string }>("/user/profile_update", dto);
   },

   emailUpdate: async (email: { email: string }): Promise<AxiosResponse> => {
      return axiosInstance.post<{ message: string }>("/user/email_change", email);
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      const confirmationDto = { confirmationToken };

      return axiosInstance.patch("/user/email_reset", confirmationDto);
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      const resetPasswordDto = { newPassword, currentPassword };

      return axiosInstance.patch<{ message: string }>("/user/password_change", resetPasswordDto);
   },

   getUserInfo: async (): Promise<IUserInfoDto> => {
      const { data } = await axiosInstance.get<IUserInfoDto>("/user/get_info");
      return data;
   },

};