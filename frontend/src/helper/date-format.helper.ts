export const dateFormat = (date: number) => {
   return new Date(date).toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
   });
};