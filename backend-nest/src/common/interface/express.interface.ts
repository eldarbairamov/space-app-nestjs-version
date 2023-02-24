import { Request } from "express";
import { UserDocument } from "../../user/model/user.model";

export interface RequestWithUser extends Request {
   user?: UserDocument;
}

export interface RequestWithTokenPayload extends Request {
   user: {
      userId: string
      token: string
      email: string
   };
}