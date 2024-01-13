import * as NestCommon from '@nestjs/common';
import { Logger } from 'tslog';

export interface LoggerService {
  trace(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  fatal(message: string, ...args: unknown[]): void;
}

@NestCommon.Injectable()
export class LoggerServiceImpl {
  constructor(private readonly config) {}
}
