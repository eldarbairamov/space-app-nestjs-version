import { Request } from "express";
import { UserDocument } from "@src/user/model/user.model";

export interface RequestWithUser extends Request {
   user?: UserDocument;
}