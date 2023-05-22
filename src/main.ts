import * as NestCore from '@nestjs/core';
import * as NestConfig from '@nestjs/config';
import * as NestCommon from '@nestjs/common';
import * as NestSwagger from '@nestjs/swagger';

import * as ClassValidator from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';

import * as App from 'src/app.module'
import * as Logger from 'common/logger';
import * as Interceptors from "common/interceptors/transform.interceptor";
import * as Configs from 'common/config';

!async function (): Promise<void> {
    const app = await NestCore.NestFactory.create(App.AppModule);

    const config = app.get(NestConfig.ConfigService);
    const logger = app.get(Logger.LoggerService);

    const swagger = config.get<NestConfig.ConfigType<typeof Configs.SwaggerConfig>>('swagger');

    const swaggerConfig = new NestSwagger.DocumentBuilder()
        .setTitle(swagger.title)
        .setDescription(swagger.description)
        .setVersion(swagger.version)
        .addBearerAuth()
        .build();

    const document = NestSwagger.SwaggerModule.createDocument(app, swaggerConfig);

    NestSwagger.SwaggerModule.setup(swagger.url, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: swagger.title,
        customCss: '.swagger-container .swagger-ui { max-width: 800px; margin: 0 auto; }',
    });

    app.use(helmet());
    app.use(compression());
    app.enableCors();
    app.useGlobalPipes(
        new NestCommon.ValidationPipe({
            transform: true,
        })
    );

    app.useGlobalInterceptors(new Interceptors.TransformInterceptor());
    ClassValidator.useContainer(app.select(App.AppModule), { fallbackOnErrors: true });

    const server = config.get<NestConfig.ConfigType<typeof Configs.ServerConfig>>('server');

   await app.listen(server.port, server.host, async () => {
        logger.info(`Server running on ${await app.getUrl()}`)
   });
}();


