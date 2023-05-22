import * as NestCommon from '@nestjs/common';
import * as NestPassword from '@nestjs/passport';

@NestCommon.Injectable()
export class JwtAuthGuard extends NestPassword.AuthGuard('jwt') {}
