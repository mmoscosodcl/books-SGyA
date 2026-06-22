import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsIsbn13', async: false })
export class Isbn13Constraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    const normalized = value.replace(/[\s-]/g, '');
    if (!/^\d{13}$/.test(normalized)) return false;

    const digits = normalized.split('').map(Number);
    const sum = digits
      .slice(0, 12)
      .reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);

    const check = (10 - (sum % 10)) % 10;
    return digits[12] === check;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'isbn13 must be a valid ISBN-13';
  }
}

export function IsIsbn13(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: Isbn13Constraint,
    });
  };
}