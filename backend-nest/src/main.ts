import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { staticPath } from "./common/constants";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import configuration from "./config/configuration";

const start = async () => {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.useGlobalPipes(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: true}}));
   app.useStaticAssets(staticPath);
   app.setGlobalPrefix("api");
   app.enableCors();

   const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle("Space App")
      .setDescription("Final fullstack project for Okten School")
      .setVersion("1.0.0")
      .build();

   const document = SwaggerModule.createDocument(app, config);

   SwaggerModule.setup("/docs", app, document);

   await app.listen(configuration().port);
};

start().then(() => console.log(`Server started on port ${ configuration().port }`));