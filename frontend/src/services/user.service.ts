import { type IUserDto, type IUserInfoDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";

const accessToken = localStorage.getItem("accessToken");

export const userService = {

   profileUpdate: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.patch<{ message: string }>("/user/profile_update", dto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return result.data.message;
   },

   emailUpdate: async (email: { email: string }): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>("/user/email_change", email, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return result.data.message;
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      const confirmationDto = { confirmationToken };

      return axiosInstance.patch("/user/email_reset", confirmationDto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      const resetPasswordDto = { newPassword, currentPassword };

      return axiosInstance.patch<{ message: string }>("/user/password_change", resetPasswordDto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   getUserInfo: async (): Promise<IUserInfoDto> => {
      const { data } = await axiosInstance.get<IUserInfoDto>("/user/get_info", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return data;
   },
};