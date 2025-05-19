import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions 
} from "class-validator"
import { isAddress } from "ethers"

export function IsEthAddress(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEthAddress',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && isAddress(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Ethereum address`;
        }
      }
    })
  }
}
