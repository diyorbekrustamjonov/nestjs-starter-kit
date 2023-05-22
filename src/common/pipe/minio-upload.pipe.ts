import * as NestCommon from '@nestjs/common';
import * as Enums from 'common/enums'

@NestCommon.Injectable()
export class MinioUploadPipe implements NestCommon.PipeTransform {
    public async transform(
        value: Express.Multer.File,
        metadata: NestCommon.ArgumentMetadata
    ): Promise<Express.Multer.File> {

        if (!value) {
            throw new NestCommon.BadRequestException('No such file');
        }

        if (!Object.values(Enums.UploadMimetype).includes(value.mimetype as Enums.UploadMimetype)) {
            throw new NestCommon.BadRequestException(`Invalid file type ${value.mimetype}`);
        }

        value.originalname = this.editFileName(value.originalname);

        return value;
    }

    private editFileName(originalName: string): string {
        let fileName = originalName.toLowerCase().replace(/ /g, '-')
        let timestamp = Date.now();
        return `${timestamp}-${fileName}`;
    }
}
