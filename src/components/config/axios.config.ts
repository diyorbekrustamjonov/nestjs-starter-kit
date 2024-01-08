import * as NestConfig from '@nestjs/config';

export const AxiosConfig = NestConfig.registerAs('axios', () => ({
  timeout: process.env.AXIOS_TIMEOUT || 2000,
  maxRedirects: process.env.AXIOS_MAX_REDIRECTS || 3,
}));
