import * as NestConfig from '@nestjs/config';
import { Config } from '../config';

export class ConfigImpl implements Config {
  constructor(private readonly configService: NestConfig.ConfigService) {}
  get logger(): Config['logger'] {
    return {
      levels: this.configService.getOrThrow('logger.levels'),
      prettyPrint: this.configService.getOrThrow('logger.prettyPrint'),
      level: this.configService.getOrThrow('logger.level'),
    };
  }
}
