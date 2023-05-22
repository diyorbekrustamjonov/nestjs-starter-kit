import * as NestMongoose from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import * as Enums from 'common/enums'

export type TokenDocument = Mongoose.HydratedDocument<Token>;

@NestMongoose.Schema({
    timestamps: true,
})
export class Token {
    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
    })
    token: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.String,
        required: true,
        enum: [Enums.TokenType.ResetPassword, Enums.TokenType.ConfirmEmail, Enums.TokenType.RefreshToken],
    })
    type: string;

    @NestMongoose.Prop({
        type: Mongoose.SchemaTypes.Date,
        required: false,
        nullable: true,
    })
    expires?: Date;

    @NestMongoose.Prop({
        type: Mongoose.Types.ObjectId,
        required: true,
    })
    user: string;

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

export const TokenSchema = NestMongoose.SchemaFactory.createForClass(Token);
