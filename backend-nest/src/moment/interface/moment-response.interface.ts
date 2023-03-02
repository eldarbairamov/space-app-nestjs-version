export interface IMomentResponse {
   readonly id: string;
   readonly title: string;
   readonly date: number;
   readonly photo: string,
   readonly location: string;
   readonly tags: string[];
   readonly createdAt: number;
}

export interface IMomentsResponse {
   readonly data: IMomentResponse[];
   readonly tagsForFilter: (string | undefined)[];
}