import { type Request } from "express";
import fileUpload from "express-fileupload";
import { type UserDocument } from "../model";

export interface RequestWithCustomVarAndQuery<Q> extends Request<{}, {}, {}, Q> {
   query: Q;
   user?: UserDocument;
   token?: string;
   userId?: UserDocument["id"];
}

export interface IRequest<B, P, Q> extends Request<P, {}, B, Q> {
   body: B;
   params: P;
   query: Q;
   userId?: UserDocument["id"];
   token?: string;
   files?: fileUpload.FileArray | null | undefined;
   user?: UserDocument;
}

export interface IQuery {
   limit: string;
   page: string;
   searchKey: string;
}