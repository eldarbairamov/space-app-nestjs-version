export interface IOAuthSchema {
   ownerId: string,
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
   notesIds: string
   plansIds: string
   memoriesIds: string
}

export interface IUserDatabase extends IUserSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface IActionTokenSchema {
   ownerId: string,
   tokenType: string,
   token: string
}

export interface IActionTokenDatabase extends IActionTokenSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface INoteSchema {
   ownerId: string,
   title: string,
   body: string,
}

export interface INoteDatabase extends INoteSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface IPlanSchema {
   ownerId: string
   title: string,
   tasksIds: string[]
}

export interface IPlanDatabase extends IPlanSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}

export interface ITaskSchema {
   ownerId: string,
   planId: string,
   title: string,
   isCompleted: boolean
}

export interface ITaskDatabase extends ITaskSchema {
   _id: string,
   createdAt: string,
   updatedAt: string,
}