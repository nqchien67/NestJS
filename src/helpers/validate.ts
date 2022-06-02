import Ajv from 'ajv';
import { CustomHttpException } from './exception';
import addFormats from 'ajv-formats';
import mongoose from 'mongoose';
import { ErrorCode } from '$types/enums';

// Ex: 2021-06-19T00:00:00.000Z
const ISOStringRegex = new RegExp(
  '^\\d\\d\\d\\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9].[0-9][0-9][0-9])Z$',
);

const AjvInstance = new Ajv();
addFormats(AjvInstance);
AjvInstance.addFormat('ISOString', {
  validate: (dateTimeString: string) => ISOStringRegex.test(dateTimeString),
});

AjvInstance.addFormat('objectId', {
  validate: (value: string) => mongoose.isValidObjectId(value),
});

export function validate(schemaKeyRef: AjvSchema | any, data: any) {
  const validate = AjvInstance.validate(schemaKeyRef, data);
  if (!validate) {
    if (AjvInstance.errors.length === 1) {
      throw new CustomHttpException(ErrorCode.Validate_fail, AjvInstance.errors[0]);
    } else {
      throw new CustomHttpException(ErrorCode.Validate_fail, AjvInstance.errors);
    }
  }
}
