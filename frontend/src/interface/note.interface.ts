export interface INote {
   readonly id: string;
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}

export interface INotes {
   data: INote[];
   readonly count: number;
   readonly page: number;
   readonly totalPages: number;
   readonly perPage: number
   readonly hasNextPage: boolean;
   readonly hasPrevPage: boolean;
}

export interface IUpdateNote {
   readonly title: string;
   readonly body: string;
}