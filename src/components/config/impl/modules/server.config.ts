import * as NestConfig from '@nestjs/config';

export const ServerConfig = NestConfig.registerAs('server', () => ({
  host: process.env.SERVER_HOST || '127.0.0.1',
  port: process.env.SERVER_PORT || 8080,
  name: process.env.SERVER_NAME || 'Nest Starter Kit',
  url: process.env.SERVER_URL || 'http://127.0.0.1:8080',
}));
