import * as NestMongoose from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import * as Enums from 'common/enums';

export type UploadDocument = Upload & Mongoose.Document;

@NestMongoose.Schema()
export class Upload {
    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    data: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    directory: Enums.UploadDirectory;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    mimetype: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Number,
        required: true,
    })
    size: number;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Date,
        required: false,
    })
    updatedAt: Date;
}

export const UploadSchema = NestMongoose.SchemaFactory.createForClass(Upload);
