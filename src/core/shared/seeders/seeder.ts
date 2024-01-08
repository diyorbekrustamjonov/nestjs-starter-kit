import * as NestSeeder from 'nestjs-seeder';
import * as NestMongoose from '@nestjs/mongoose';
import * as NestConfig from '@nestjs/config';
import * as Configs from 'src/components/config';

import * as Mocks from 'shared/seeders/mocks';
import * as Schemas from 'core/schemas';

NestSeeder.seeder({
  imports: [
    NestConfig.ConfigModule.forRoot({
      load: [Configs.MongodbConfig],
      cache: true,
    }),
    NestMongoose.MongooseModule.forRootAsync({
      imports: [NestConfig.ConfigModule],
      useFactory: (configService: NestConfig.ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        useNewUrlParser: true,
      }),
      inject: [NestConfig.ConfigService],
    }),
    NestMongoose.MongooseModule.forFeature([
      {
        name: Schemas.Role.name,
        schema: Schemas.RoleSchema,
      },
    ]),
  ],
}).run([Mocks.RolesSeeder]);
