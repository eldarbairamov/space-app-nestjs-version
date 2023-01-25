import { type IUserDto, type IUserInfoDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";

export const userService = {

   profileUpdate: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.patch<{ message: string }>("/user/profile_update", dto);

      return result.data.message;
   },

   emailUpdate: async (email: { email: string }): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>("/user/email_change", email);

      return result.data.message;
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