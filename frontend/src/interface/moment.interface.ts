export interface IMoment {
   readonly id: string;
   readonly title: string;
   readonly photo: string;
   readonly date: number;
   readonly location: string;
   readonly tags: string[];
   readonly createdAt: number;
}

export interface IMoments {
   readonly data: IMoment[];
   readonly tagsForFilter: (string | undefined)[];
   readonly count: number;
}