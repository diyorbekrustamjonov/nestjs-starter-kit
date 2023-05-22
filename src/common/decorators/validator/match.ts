import * as ClassValidator from 'class-validator';

export function Match(property: string, validationOptions?: ClassValidator.ValidationOptions) {
    return (object: any, propertyName: string) => {
        ClassValidator.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ClassValidator.ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ClassValidator.ValidatorConstraintInterface {
    validate(value: any, args: ClassValidator.ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: ClassValidator.ValidationArguments) {
        return args.property + ' not match with ' + args.constraints[0];
    }
}
