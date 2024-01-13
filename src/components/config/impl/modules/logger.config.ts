import * as NestConfig from '@nestjs/config';
import { Config } from '../../config';

export const LoggerConfig = NestConfig.registerAs<Config['logger']>('logger', (): Config['logger'] => {
  return {
    levels: process.env.LOGGER_LEVELS?.split(','),
    prettyPrint: process.env.LOGGER_PRETTY_PRINT === 'true',
    level: process.env.LOGGER_LEVEL,
  };
});
