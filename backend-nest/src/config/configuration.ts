export default () => ({
   PORT: process.env.PORT || 3010,

   CLIENT_URL: "http://localhost:5173",

   EMAIL_SERVICE_USER: "your.space.application@gmail.com",
   EMAIL_SERVICE_PASS: "doyfhkvwcyctpdzb",

   MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/space-app-nestjs",

   SECRET_ACCESS_TOKEN_KEY: process.env.SECRET_ACCESS_TOKEN_KEY || "secret access token key",
   SECRET_REFRESH_TOKEN_KEY: process.env.SECRET_REFRESH_TOKEN_KEY || "secret access refresh key",
   SECRET_FORGOT_PASS_KEY: process.env.SECRET_FORGOT_PASS_KEY || "secret forgot pass key",
   SECRET_CHANGE_EMAIL_KEY: process.env.SECRET_CHANGE_EMAIL_KEY || "secret change email key",
})
