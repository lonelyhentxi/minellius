import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from '../exceptions/custom-validation.error';
import { CustomError } from '../exceptions/custom.error';

@Catch(SyntaxError, CustomValidationError, CustomError, HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
  ) {
  }

  private response(
    exception: CustomValidationError | SyntaxError | Error | HttpException,
    host: ArgumentsHost,
    data: any,
    status?: number,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    Logger.error(
      JSON.stringify(exception),
      undefined,
      CustomExceptionFilter.name,
    );
    response.status(status ? status : HttpStatus.BAD_REQUEST).json(data);
  }

  catch(
    exception: CustomValidationError | SyntaxError | Error | HttpException,
    host: ArgumentsHost,
  ) {
    const errors = {};
    if (exception instanceof CustomValidationError) {
      exception.errors.forEach((error: ValidationError) => {
        Object.keys(error.constraints).forEach((key: string) => {
          if (!errors[error.property]) {
            errors[error.property] = [];
          }
          errors[error.property].push(error.constraints[key]);
        });
      });
      this.response(exception, host, {
        validationErrors: errors,
      });
    }
    if (exception instanceof CustomError) {
      this.response(exception, host, {
        message: exception.message,
      });
    }
    if (exception instanceof SyntaxError) {
      this.response(exception, host, {
        message: 'Syntax error',
      });
    }
    if (exception instanceof HttpException) {
      this.response(
        exception,
        host,
        {
          message:
            exception.message && exception.message.message
              ? exception.message.message
              : 'Http exception',
        },
        exception.getStatus(),
      );
    }
  }
}
