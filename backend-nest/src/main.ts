import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { staticPath } from "./common/constants/static-path.constant";

const start = async () => {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   app.useStaticAssets(staticPath);
   app.enableCors();
   await app.listen(process.env.PORT);
};

start().then(() => console.log(`Server started on port ${ process.env.PORT }`));