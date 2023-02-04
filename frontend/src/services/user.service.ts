import { axiosInstance } from "./axios.service";
import { type AxiosResponse } from "axios";
import { userRequests } from "../config/config";
import { UserDto, UserInfoDto } from "../dto";

export const userService = {

   profileUpdate: async (dto: Partial<UserDto>): Promise<AxiosResponse> => {
      return axiosInstance.patch<UserInfoDto>(userRequests.profileUpdate, dto);
   },

   changeEmailRequest: async (email: { email: string }): Promise<AxiosResponse> => {
      return axiosInstance.post<{ message: string }>(userRequests.changeEmail, email);
   },

   changeEmail: async (confirmationToken: string): Promise<AxiosResponse> => {
      const confirmationDto = { confirmationToken };

      return axiosInstance.patch(userRequests.changeEmailAccept, confirmationDto);
   },

   changePassword: async (newPassword: string, currentPassword: string): Promise<AxiosResponse> => {
      const resetPasswordDto = { newPassword, currentPassword };

      return axiosInstance.patch<{ message: string }>(userRequests.changePassword, resetPasswordDto);
   },

   getUser: async (): Promise<UserInfoDto> => {
      const { data } = await axiosInstance.get<UserInfoDto>(userRequests.getUser);
      return data;
   },

   uploadAvatar: async (formData: FormData): Promise<string> => {
      const { data } = await axiosInstance.patch<{ image: string }>(userRequests.uploadAvatar, formData);
      return data.image;
   },

   deleteAvatar: async (fileName: string): Promise<void> => {
      const deleteAvatarDto = { fileName };
      return axiosInstance.patch(userRequests.deleteAvatar, deleteAvatarDto);
   },

};