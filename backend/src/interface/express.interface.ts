import { type Request } from "express";
import { IUserDatabase } from "./mongoose.interface";

export interface RequestWithBody<B> extends Request<{}, {}, B> {
   body: B;
}

export interface RequestWithBodyAndCustomVar<B> extends Request<{}, {}, B> {
   body: B;
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}

export interface RequestWithCustomVar extends Request {
   token?: string;
   userId?: string;
   user?: IUserDatabase;
}