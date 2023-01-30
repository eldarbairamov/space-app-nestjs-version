export interface INoteDto {
   id: string,
   title: string,
   body: string,
   lastModified: number
}

export interface IOAuthDto {
   tokenId: string,
   tokenOwnerId: string,
   tokenOwnerUsername: string,
   accessToken: string,
   refreshToken: string
}

export interface IPlanDto {
   id: string,
   title: string,
   lastModified: number
}

export interface IUserDto {
   name: string,
   surname: string,
   username: string,
   email: string,
   password: string,
   current_password: string,
   repeat_password: string
   avatar: string
}

export interface IUserInfoDto {
   name: string,
   surname: string,
   username: string,
   email: string,
   avatar: string
}

export interface ITaskDto {
   id: string,
   title: string,
   isCompleted: boolean
}