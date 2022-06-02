import { ErrorCode, ErrorMessage } from '$types/enums';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { getLogger } from 'log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    Object.assign(exception, {
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        ip: request.ip,
        statusCode: status,
        // authorization: request.headers?.authorization,
        // user: request.user,
      },
    });

    this.logger.error(exception);

    const { statusCode, ...errorObject } = formatErrorObject(exception);

    response.status(statusCode).json(errorObject);
  }
}

export function formatErrorObject(exception: HttpException | any) {
  const errorObj = {
    success: false,
    statusCode: exception.status || HttpStatus.BAD_REQUEST,
    errorCode: ErrorCode.Unknown_Error,
    errorMessage: null,
  };

  if (exception instanceof HttpException) {
    const data = exception.getResponse() as any;
    if (data.error === 'Not Found') {
      return {
        success: false,
        statusCode: data.status || HttpStatus.BAD_REQUEST,
        errorCode: ErrorCode.Not_Found,
        errorMessage: ErrorCode.Not_Found,
        devMessage: data.message,
      };
    }

    if (data.error === 'Forbidden') {
      return {
        success: false,
        statusCode: data.status || HttpStatus.BAD_REQUEST,
        errorCode: 'ErrorCode.Forbidden_Resource',
        errorMessage: 'ErrorCode.Forbidden_Resource',
        devMessage: data.message,
      };
    }

    if (data?.errorCode) errorObj.errorCode = data?.errorCode;
    if (data?.statusCode) errorObj.statusCode = data?.statusCode;
    if (data?.devMessage) errorObj['devMessage'] = data['devMessage'];
    if (data?.payload) errorObj['payload'] = data['payload'];

    if (data?.errorMessage) errorObj.errorMessage = data.errorMessage;

    if (data === 'ThrottlerException: Too Many Requests') {
      errorObj.errorCode = ErrorCode.The_Allowed_Number_Of_Calls_Has_Been_Exceeded;
      errorObj['devMessage'] = 'Too Many Requests';
    }
  }

  // TODO: Replace with real text
  // TODO: Get errorMessage from language
  if (!errorObj?.errorMessage) errorObj['errorMessage'] = errorObj.errorCode;

  // TODO add db lu vao cache roi tra ve => co the update
  errorObj.errorMessage = ErrorMessage[errorObj.errorCode] || errorObj.errorCode;

  return errorObj;
}
