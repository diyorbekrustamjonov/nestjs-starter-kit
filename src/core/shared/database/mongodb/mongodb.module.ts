import * as NestCommon from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as NestMongoose from '@nestjs/mongoose';

import * as Mongoose from 'mongoose';
import * as MongooseSlugUpdater from 'mongoose-slug-updater';
import * as Configs from '../../../../components/config/impl/modules';

@NestCommon.Module({
  imports: [
    NestMongoose.MongooseModule.forRootAsync({
      imports: [NestConfig.ConfigModule],
      inject: [NestConfig.ConfigService],
      useFactory: async function (
        configService: NestConfig.ConfigService
      ): Promise<NestMongoose.MongooseModuleOptions> {
        const mongodb = configService.get<NestConfig.ConfigType<typeof Configs.MongodbConfig>>('mongodb');
        return {
          uri: mongodb.uri,
          connectionFactory: async (connection: Mongoose.Connection): Promise<Mongoose.Connection> => {
            connection.plugin(MongooseSlugUpdater);
            return connection;
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [NestMongoose.MongooseModule],
})
export class MongodbModule {}
