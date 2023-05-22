import * as NestConfig from '@nestjs/config';

export const JwtConfig = NestConfig.registerAs('jwt', () => ({
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'jwtSecret',
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '1h',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'jwtRefreshSecret',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '1d',
}));

