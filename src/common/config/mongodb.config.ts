import * as NestConfig from '@nestjs/config';

export const MongodbConfig = NestConfig.registerAs('mongodb', () => {
    return {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nestjs',
    };
});
