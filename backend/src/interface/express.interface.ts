import { type Request } from "express";
import { type IUserDatabase } from "./db.interface";
import { type ObjectId } from "mongoose";

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

export interface RequestWithBodyVarParams<B, P> extends Request<P, {}, B> {
   body: B;
   params: P;
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}

export interface RequestWithCustomVarAndParams<P> extends Request<P> {
   params: P,
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}