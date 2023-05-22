import * as NestCommon from '@nestjs/common';
import { Logger } from 'tslog';

@NestCommon.Injectable()
export class LoggerService extends Logger {
    constructor() {
        super({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        });
    }
}