import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = isHttp ? exception.getResponse() : null;

    const detail =
      typeof payload === 'string'
        ? payload
        : (payload as any)?.message
          ? Array.isArray((payload as any).message)
            ? 'Validation failed'
            : (payload as any).message
          : exception instanceof Error
            ? exception.message
            : 'Unexpected error';

    const errors = Array.isArray((payload as any)?.message) ? (payload as any).message : undefined;

    response
      .status(status)
      .type('application/problem+json')
      .json({
        type: `https://httpstatuses.com/${status}`,
        title: this.title(status),
        status,
        detail,
        instance: request.url,
        ...(errors ? { errors } : {}),
      });
  }

  private title(status: number): string {
    return {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
    }[status] ?? 'Error';
  }
}