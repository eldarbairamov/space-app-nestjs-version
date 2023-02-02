import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { userRequests } from "../config/config";
import { UserDto, UserInfoDto } from "../dto";

export const userService = {

   profileUpdate: async (dto: Partial<UserDto>): Promise<AxiosResponse> => {
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

   getUserInfo: async (): Promise<UserInfoDto> => {
      const { data } = await axiosInstance.get<UserInfoDto>(userRequests.getUserInfo);
      return data;
   },

};