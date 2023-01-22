import { IUserDto, IUserInfoDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { AxiosResponse } from "axios";

export const userService = {
   profileUpdate: async (dto: Partial<IUserDto>): Promise<string> => {
      const accessToken = localStorage.getItem("accessToken");

      const result = await axiosInstance.patch<{ message: string }>("/user/profile_update", dto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return result.data.message;
   },

   emailUpdate: async (email: { email: string }): Promise<string> => {
      const accessToken = localStorage.getItem("accessToken");

      const result = await axiosInstance.post<{ message: string }>("/user/email_change", email, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return result.data.message;
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      const accessToken = localStorage.getItem("accessToken");
      const confirmationDto = { confirmationToken };

      return axiosInstance.patch("/user/email_reset", confirmationDto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      const accessToken = localStorage.getItem("accessToken");
      const resetPasswordDto = { newPassword, currentPassword };

      return axiosInstance.patch<{ message: string }>("/user/password_change", resetPasswordDto, {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });
   },

   getUserInfo: async (): Promise<IUserInfoDto> => {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axiosInstance.get<IUserInfoDto>("/user/get_info", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      return data;
   },
};