import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isLatitudeOrLongitude', async: false })
export class IsLatitudeOrLongitudeConstraint implements ValidatorConstraintInterface {
  public validate(value: any): boolean {
    const regex = /^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,})?)$/;

    if (!value || typeof value !== 'number') {
      return false;
    }

    return regex.test(value.toString());
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid latitude or longitude value.`;
  }
}

export function IsLatitudeOrLongitude(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): any {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsLatitudeOrLongitudeConstraint,
    });
  };
}
