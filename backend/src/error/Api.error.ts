export class ApiError extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static Database() {
      return new ApiError("Помилка при роботі з базою даних", 500);
   }

   static BadRequest() {
      return new ApiError("Некоректний запит", 400);
   }

   static NotFound() {
      return new ApiError("Не знайдено", 404);
   }

   static ObjectID() {
      return new ApiError("Не валідний ObjectID", 400);
   }

}