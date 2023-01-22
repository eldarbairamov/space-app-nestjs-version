export const config = {
   PORT: process.env.PORT || 5400,
   MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/fullstack",
   API_URL: process.env.API_URL || "https://0.0.0.0:5400/api",
   CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

   EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
   EMAIL_SERVICE_PASS: process.env.EMAIL_SERVICE_PASS,
};