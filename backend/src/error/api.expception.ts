export class ApiException extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static Database(e: unknown) {
      console.log(e);
      return new ApiException("Помилка при роботі з базою даних", 500);
   }

   static BadRequest() {
      return new ApiException("Некоректний запит", 400);
   }

   static NotFound() {
      return new ApiException("Не знайдено", 404);
   }

   static ObjectID() {
      return new ApiException("Не валідний ObjectID", 400);
   }

}