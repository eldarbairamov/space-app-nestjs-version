export interface IChangePassword {
   current_password: string;
   password: string;
   repeat_password: string;
}

export interface IUpdateProfile {
   username: string;
   name: string;
   surname: string;
}

export interface ILogin {
   email: string;
   password: string;
}

export interface IRegistration {
   email: string;
   username: string;
   password: string;
}

export interface INoteUpdate {
   title: string;
   body: string;
}

export interface IAddTask {
   title: string,
   planId: boolean
}