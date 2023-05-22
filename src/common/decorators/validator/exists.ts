import * as NestCommon from '@nestjs/common';
import * as NestMongoose from '@nestjs/mongoose';

import * as ClassValidator from 'class-validator';
import * as Mongoose from 'mongoose';

interface ExistsValidationArguments<D> extends ClassValidator.ValidationArguments {
    constraints: [
        Mongoose.Model<Mongoose.Document<D>>,
        (
            | ((validationArguments: ClassValidator.ValidationArguments) => Mongoose.FilterQuery<Mongoose.Document<D>>)
            | keyof D
        )
    ];
}

abstract class ExistsValidator implements ClassValidator.ValidatorConstraintInterface {
    protected constructor(protected readonly connection: Mongoose.Connection) {}

    public async validate<E>(value: string, args: ExistsValidationArguments<E>): Promise<any> {
        const [Model, findCondition = args.property] = args.constraints;

        if (findCondition === '_id') {
            if (!Mongoose.isValidObjectId(value)) {
                return false;
            }
        }

        const filterQuery =
            typeof findCondition === 'function'
                ? findCondition(args)
                : {
                      [findCondition || args.property]: value,
                  };

        if (filterQuery.id) {
            filterQuery._id = filterQuery.id;
            delete filterQuery.id;
        }

        const count = await this.connection.model(Model.name).countDocuments(filterQuery).exec();
        return count > 0;
    }

    public defaultMessage(args: ClassValidator.ValidationArguments): string {
        return `'${args.property}' ${args.value} doesn't exist`;
    }
}

@ClassValidator.ValidatorConstraint({ name: 'Exists', async: true })
@NestCommon.Injectable()
export class Exists extends ExistsValidator {
    constructor(@NestMongoose.InjectConnection() protected readonly connection: Mongoose.Connection) {
        super(connection);
    }
}
