import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { UserDto } from "../dto";

export const resetFields = (setValue: UseFormSetValue<Partial<UserDto>>) => {
   setValue("username", "");
   setValue("email", "");
   setValue("password", "");
};