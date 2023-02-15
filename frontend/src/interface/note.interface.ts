export interface INote {
   readonly id: string;
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}