import * as NestCommon from '@nestjs/common';

import * as Mongoose from 'mongoose';

@NestCommon.Injectable()
export class ParseObjectIdPipe implements NestCommon.PipeTransform<string, string> {
  public transform(value: string): string {
    if (!Mongoose.isValidObjectId(value)) {
      throw new NestCommon.BadRequestException(`${value} is not a valid ObjectId`);
    }

    return value;
  }
}
