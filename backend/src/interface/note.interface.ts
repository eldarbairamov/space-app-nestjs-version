export interface INoteResponse {
   id: string;
   title: string;
   body: string;
   lastModified: number;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}