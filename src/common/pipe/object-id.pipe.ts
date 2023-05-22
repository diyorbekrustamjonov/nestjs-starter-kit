import * as NestCommon from '@nestjs/common';
import * as mongoose from 'mongoose';

@NestCommon.Injectable()
export class ParseObjectIdPipe implements NestCommon.PipeTransform<string, string> {
    public transform(value: string, metadata: NestCommon.ArgumentMetadata): string {
        if (!mongoose.isValidObjectId(value)) {
            throw new NestCommon.BadRequestException(`$value is not a valid mongoose object id`);
        }
        return value;
    }
}
