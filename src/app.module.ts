import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import * as NestConfig from '@nestjs/config';
import * as NestThrottler from '@nestjs/throttler';
import * as NestMulter from '@nestjs/platform-express/multer';
import * as Multer from 'multer';

import * as Modules from 'src/modules';
import * as Logger from 'common/logger';
import * as Configs from './components/config/impl/modules';
import * as Databases from 'core/shared/database/mongodb/mongodb.module';

@NestCommon.Module({
  imports: [
    NestMulter.MulterModule.register({
      storage: Multer.memoryStorage(),
    }),
    NestConfig.ConfigModule.forRoot({
      load: [
        Configs.MongodbConfig,
        Configs.ServerConfig,
        Configs.AxiosConfig,
        Configs.JwtConfig,
        Configs.SwaggerConfig,
      ],
      cache: true,
    }),
    Logger.LoggerModule,
    NestThrottler.ThrottlerModule.forRoot(),
    Databases.MongodbModule,
    Modules.IndexModule,
  ],
  controllers: [],
  providers: [
    {
      provide: NestCore.APP_GUARD,
      useClass: NestThrottler.ThrottlerGuard,
    },
  ],
})
export class AppModule {}
