import { type Request } from "express";
import { type IUserDatabase } from "./database.interface";

export interface RequestWithBody<B> extends Request<{}, {}, B> {
   body: B;
}

export interface RequestWithBodyAndParam<B, P> extends Request<P, {}, B> {
   body: B;
   params: P;
}

export interface RequestWithBodyAndVar<B> extends Request<{}, {}, B> {
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

export interface RequestWithBodyVarParam<B, P> extends Request<P, {}, B> {
   body: B;
   params: P;
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}

export interface RequestWithCustomVarAndParam<P> extends Request<P> {
   params: P,
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}

export interface RequestWithParam<P> extends Request<P> {
   params: P;
}

export interface RequestWithCustomVarAndQuery<Q> extends Request<{}, {}, {}, Q> {
   query: Q;
   user?: IUserDatabase;
   token?: string;
   userId?: string;
}