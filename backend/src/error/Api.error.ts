export class ApiError extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static DatabaseError() {
      return new ApiError('Помилка при роботі з базою даних', 500)
   }

}