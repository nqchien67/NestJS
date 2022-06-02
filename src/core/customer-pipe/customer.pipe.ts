import { CustomHttpException } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string> {
  transform(value: any, metadata: ArgumentMetadata) {
    const isNumeric = ['string', 'number'].includes(typeof value) && !isNaN(parseFloat(value)) && isFinite(value);

    if (!isNumeric) {
      throw new CustomHttpException(ErrorCode.Not_Found, 'dongu do an hai');
    }

    return parseInt(value, 10);
  }
}

@Injectable()
export class CustomerValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new CustomHttpException(ErrorCode.Validate_fail, errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
