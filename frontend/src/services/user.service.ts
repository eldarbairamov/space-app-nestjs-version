import { type IUserDto, type IUserInfoDto } from "../interface";
import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { userRequests } from "../config/config";

export const userService = {

   profileUpdate: async (dto: Partial<IUserDto>): Promise<AxiosResponse> => {
      return axiosInstance.patch<{ message: string }>(userRequests.profileUpdate, dto);
   },

   changeEmailRequest: async (email: { email: string }): Promise<AxiosResponse> => {
      return axiosInstance.post<{ message: string }>(userRequests.changeEmailRequest, email);
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      const confirmationDto = { confirmationToken };

      return axiosInstance.patch(userRequests.changeEmail, confirmationDto);
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      const resetPasswordDto = { newPassword, currentPassword };

      return axiosInstance.patch<{ message: string }>(userRequests.changePassword, resetPasswordDto);
   },

   getUserInfo: async (): Promise<IUserInfoDto> => {
      const { data } = await axiosInstance.get<IUserInfoDto>(userRequests.getUserInfo);
      return data;
   },

};