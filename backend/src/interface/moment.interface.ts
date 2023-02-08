export interface IMomentResponse {
   readonly id: string;
   readonly title: string;
   readonly date: number;
   readonly photo: string,
   readonly location: string;
   readonly tags: string[];
   readonly createdAt: number;
}

export interface IUpdateMoment {
   readonly title: string,
   readonly photo: string,
   readonly location: string,
   readonly date: Date
   readonly tags: string[]
}

export interface IDeletePhoto {
   readonly fileName: string;
}