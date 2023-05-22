import * as NestCommon from '@nestjs/common';
import * as NestMongoose from '@nestjs/mongoose';

import * as ClassValidator from 'class-validator';
import * as Mongoose from 'mongoose';

interface UniqueValidationArguments<D> extends ClassValidator.ValidationArguments {
    constraints: [
        Mongoose.Model<Mongoose.Document<D>>,
        ((validationArguments: ClassValidator.ValidationArguments) => Mongoose.Model<Mongoose.Document<D>>) | keyof D,
        [string, string]
    ];
}

abstract class UniqueValidator implements ClassValidator.ValidatorConstraintInterface {
    protected constructor(protected readonly connection: Mongoose.Connection) {}

    public async validate<E>(value: string, args: UniqueValidationArguments<E>): Promise<boolean> {
        const [Model, findCondition = args.property, except] = args.constraints;

        const filterQuery =
            typeof findCondition === 'function'
                ? findCondition(args)
                : {
                      [findCondition || args.property]: value,
                  };

        if (typeof filterQuery !== 'function' && except) {
            const [exceptField, exceptValue] = except;

            let relatedValue = (args.object as any)[exceptValue];

            if (exceptField === '_id') {
                if (!Mongoose.isValidObjectId(relatedValue)) {
                    return false;
                }
                relatedValue = new Mongoose.Types.ObjectId(relatedValue);
            }

            if (exceptField && exceptValue) {
                // @ts-ignore
                filterQuery[exceptField] = { $ne: relatedValue };
            }
        }

        return (await this.connection.model(Model.name).count(filterQuery)) <= 0;
    }

    public defaultMessage(args: ClassValidator.ValidationArguments): string {
        return `${args.property} already exist`;
    }
}

@ClassValidator.ValidatorConstraint({ name: 'Unique', async: true })
@NestCommon.Injectable()
export class Unique extends UniqueValidator {
    constructor(@NestMongoose.InjectConnection() protected readonly connection: Mongoose.Connection) {
        super(connection);
    }
}
