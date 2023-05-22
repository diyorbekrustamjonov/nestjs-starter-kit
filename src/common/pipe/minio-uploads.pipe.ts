import * as NestCommon from '@nestjs/common';
import * as Enums from 'common/enums';

function editFileName(originalName: string): string {
    let fileName = originalName.toLowerCase().replace(/ /g, '-')
    let timestamp = Date.now();
    return `${timestamp}-${fileName}`;
}

@NestCommon.Injectable()
export class MinioUploadsPipe implements NestCommon.PipeTransform {
    public async transform(
        values: Express.Multer.File[],
        metadata: NestCommon.ArgumentMetadata
    ): Promise<Express.Multer.File[]> {
        if (values.length > 10) {
            throw new NestCommon.BadRequestException('Too many files (max 10)');
        }
        if (values.length < 2) {
            throw new NestCommon.BadRequestException('Too few files (min 1)');
        }

        values = values.map(function (value): Express.Multer.File {

            if (!Object.values(Enums.UploadMimetype).includes(value.mimetype as Enums.UploadMimetype)) {
                throw new NestCommon.BadRequestException(`Invalid file type ${value.mimetype}`);
            }

            if (value.size > 1024 * 1024 * 10) {
                throw new NestCommon.BadRequestException('File size is too big (max 10MB)');
            }

            if (value.size < 1024 * 1024 * 0.01) {
                throw new NestCommon.BadRequestException('File size is too small (min 10KB)');
            }

            value.originalname = editFileName(value.originalname);

            return value;
        });
        return values;
    }
}
