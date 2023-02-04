import { UserRepository } from "../../repository";
import path from "node:path";
import { unlink } from "fs/promises";

export const deleteAvatarService = async (userId: string, fileName: string): Promise<void> => {

   // Delete avatar from DB
   await UserRepository.findByIdAndUpdate(userId, { avatar: "" });

   // Delete image from hard drive
   const imagePath = path.join(process.cwd(), "src", "upload", fileName);
   await unlink(imagePath);

};