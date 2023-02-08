export interface IMoment {
   id: string;
   readonly title: string;
   readonly photo: string;
   readonly date: number;
   readonly location: string;
   readonly tags: string[];
   createdAt: number;
}