import { type IOAuthDto, type IUserDto } from "../interface";
import { axiosInstance } from "./axios.service";

export const authService = {
   registration: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>("/auth/registration", dto);
      return result.data.message;
   },

   login: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<IOAuthDto>("/auth/login", dto);

      localStorage.setItem("accessToken", result.data.accessToken);

      return result.data.tokenOwnerUsername;
   },

   forgotPassword: async (dto: Partial<IUserDto>): Promise<string> => {
      const result = await axiosInstance.post<{ message: string }>("auth/password_forgot", dto);

      return result.data.message;
   },

   accountActivation: async (activationCode: string): Promise<string> => {
      const activationDto = { activationCode };

      const result = await axiosInstance.post<{ message: string }>("/auth/activation", activationDto);

      return result.data.message;
   },

   resetPassword: async (password: string, resetPasswordToken: string): Promise<string> => {
      const forgotPasswordDto = { resetPasswordToken, password };

      const result = await axiosInstance.post<{ message: string }>("/auth/password_reset", forgotPasswordDto);

      return result.data.message;
   },

   logout: async () => {
      const accessToken = localStorage.getItem("accessToken");

      await axiosInstance.get("/auth/logout", {
         headers: {
            "Authorization": `Bearer ${ accessToken }`,
         },
      });

      localStorage.removeItem("accessToken");
   },
};