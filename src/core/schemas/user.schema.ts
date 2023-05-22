import * as NestMongoose from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

import * as Enums from 'common/enums'
import * as Schemas from "core/schemas";

export type UserDocument = Mongoose.HydratedDocument<User>;

@NestMongoose.Schema({
    toJSON: {
        transform: (_doc, ret) => {
            delete ret.password;
            return ret;
        },
    },
})
export class User {
    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        maxlength: 30,
        required: true,
    })
    first_name: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        maxlength: 30,
        required: false,
    })
    last_name?: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        maxlength: 25,
        required: false,
        unique: true,
    })
    nickname?: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Date,
        required: false,
    })
    birthdate?: Date;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        minlength: 20,
        maxlength: 500,
        required: false,
    })
    about?: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: false,
    })
    image: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    })
    email: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    password: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
        default: Enums.UserGender.OTHER,
    })
    gender: Enums.UserGender;

    @NestMongoose.Prop({
        type: Mongoose.Types.ObjectId,
        ref: Schemas.Role.name,
        required: false,
    })
    role: Schemas.Role;

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
    updatedAt?: Date;
}

export const UserSchema = NestMongoose.SchemaFactory.createForClass(User);
