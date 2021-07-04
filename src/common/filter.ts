import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class Filter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const [req, res, _next] = host.getArgs();

    res
      .status(status)
      .json({
        status: status,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: exception.message
      });
  }
}