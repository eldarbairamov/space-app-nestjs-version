export const configuration = {
   PORT: process.env.PORT || 5400,
   MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/space-app",

   API_URL: process.env.API_URL || "http://localhost:5400",
   CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

   EMAIL_SERVICE_USER: "your.space.application@gmail.com",
   EMAIL_SERVICE_PASS: "doyfhkvwcyctpdzb",

   SECRET_ACCESS_TOKEN_KEY: process.env.SECRET_ACCESS_TOKEN_KEY as string || "secret access token key",
   SECRET_REFRESH_TOKEN_KEY: process.env.SECRET_REFRESH_TOKEN_KEY as string || "secret access refresh key",
   SECRET_FORGOT_PASS_KEY: process.env.SECRET_FORGOT_PASS_KEY as string || "secret forgot pass key",
   SECRET_CHANGE_EMAIL_KEY: process.env.SECRET_CHANGE_EMAIL_KEY as string || "secret change email key",
};
