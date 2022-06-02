import { ErrorCode } from '$types/enums';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(errorCode: ErrorCode, devMessage?: string | any, statusCode?: HttpStatus, payload?: any) {
    const errorObject = { errorCode, statusCode: statusCode || HttpStatus.BAD_REQUEST };

    if (devMessage) errorObject['devMessage'] = devMessage;
    if (payload) errorObject['payload'] = payload;

    super(errorObject, errorObject.statusCode);
  }
}
