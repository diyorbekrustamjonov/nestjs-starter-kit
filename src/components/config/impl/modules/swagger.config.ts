import * as NestConfig from '@nestjs/config';

export const SwaggerConfig = NestConfig.registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'Nest Starter Kit',
  description: process.env.SWAGGER_DESCRIPTION || 'The API documentation',
  version: process.env.SWAGGER_VERSION || '1.2',
  url: process.env.SWAGGER_URL || '/api-docs',
}));
