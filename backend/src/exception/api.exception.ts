export class ApiException extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static DatabaseError(e: unknown) {
      console.log(e);
      return new ApiException("Database: Error", 500);
   }

   static BadRequest() {
      return new ApiException("Bad request", 400);
   }

   static ObjectIsNotFound() {
      return new ApiException("Object is not found", 404);
   }

   static InvalidObjectId() {
      return new ApiException("Id is not valid", 400);
   }

}