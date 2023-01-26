export interface IOAuthSchema {
   tokenOwnerId: string,
   tokenOwnerUsername: string,
   accessToken: string,
   refreshToken: string,
}

export interface IOAuthDatabase extends IOAuthSchema {
   _id: string,
   createdAt: Date,
   updatedAt: Date,
}

export interface IUserSchema {
   name: string,
   surname: string,
   username: string,
   email: string,
   password: string,
   isActivated: boolean,
   avatar: string
}

export interface IUserDatabase extends IUserSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface IActionTokenSchema {
   tokenOwnerId: string,
   tokenType: string,
   token: string
}

export interface IActionTokenDatabase extends IActionTokenSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface INoteSchema {
   noteOwnerId: string,
   title: string,
   body: string,
}

export interface INoteDatabase extends INoteSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface IPlanSchema {
   planOwnerId: string
   title: string,
}

export interface IPlanDatabase extends IPlanSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface ITaskSchema {
   taskOwnerId: string,
   planId: string,
   title: string,
   isCompleted: boolean
}

export interface ITaskDatabase extends ITaskSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}