export default () => ({
   port: parseInt(process.env.PORT) || 5400,

   user: "your.space.application@gmail.com",
   pass: "doyfhkvwcyctpdzb",

   mongodb_uri: process.env.MONGO_URI || "mongodb://localhost:27017/space-app-nestjs",

   accessToken: process.env.SECRET_ACCESS_TOKEN_KEY || "secret access token key",
   refreshToken: process.env.SECRET_REFRESH_TOKEN_KEY || "secret access refresh key",
   forgotPass: process.env.SECRET_FORGOT_PASS_KEY || "secret forgot pass key",
   changeEmail: process.env.SECRET_CHANGE_EMAIL_KEY || "secret change email key",
})
