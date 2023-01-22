import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { type IUserDto } from "../interface";

export const resetFields = (setValue: UseFormSetValue<Partial<IUserDto>>) => {
   setValue("username", "");
   setValue("email", "");
   setValue("password", "");
};