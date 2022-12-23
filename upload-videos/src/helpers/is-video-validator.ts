import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsVideo(validationOptions?: ValidationOptions) {
  const options = ['video/*'];
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'IsVideo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return !!(
            value?.mimetype && (options ?? []).includes(value?.mimetype)
          );
        },
      },
    });
  };
}
