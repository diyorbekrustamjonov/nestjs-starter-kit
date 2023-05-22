import * as NestCommon from '@nestjs/common';
import { LoggerService } from './logger.service';

@NestCommon.Module({
    imports: [],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
