import { type Request } from "express";
import fileUpload from "express-fileupload";
import { type UserDocument } from "../model";

export interface RequestWithBody<B> extends Request<{}, {}, B> {
   body: B;
}

export interface RequestWithBodyAndParam<B, P> extends Request<P, {}, B> {
   body: B;
   params: P;
}

export interface RequestWithBodyAndVar<B> extends Request<{}, {}, B> {
   body: B;
   user?: UserDocument;
   token?: string;
   userId?: UserDocument["id"];
}

export interface RequestWithCustomVar extends Request {
   token?: string;
   userId?: UserDocument["id"];
   user?: UserDocument;
   files?: fileUpload.FileArray | null | undefined;
}

export interface RequestWithBodyVarParam<B, P> extends Request<P, {}, B> {
   body: B;
   params: P;
   user?: UserDocument;
   token?: string;
   userId?: UserDocument["id"];
}

export interface RequestWithCustomVarAndParam<P> extends Request<P> {
   params: P,
   user?: UserDocument;
   token?: string;
   userId?: UserDocument["id"];
}

export interface RequestWithParam<P> extends Request<P> {
   params: P;
}

export interface RequestWithCustomVarAndQuery<Q> extends Request<{}, {}, {}, Q> {
   query: Q;
   user?: UserDocument;
   token?: string;
   userId?: UserDocument["id"];
}