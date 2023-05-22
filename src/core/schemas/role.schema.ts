import * as NestMongoose from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type RoleDocument = Role & Mongoose.Document;

@NestMongoose.Schema({
    collection: 'roles',
    timestamps: true,
})
export class Role {
    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    name: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Array,
        required: false,
    })
    permissions?: string[];

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

export const RoleSchema = NestMongoose.SchemaFactory.createForClass(Role);
