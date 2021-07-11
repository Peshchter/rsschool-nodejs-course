import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fileWrite } from '../common/logging';

@Injectable()
export class MyLogger implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req) {
      const { method, url, query, body } = req;
      fileWrite(`Received: method: ${method} , url: ${url}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)} \n`);
    }

    return next
      .handle()
      .pipe(
        tap(() => fileWrite(`Send: statusCode: ${context.switchToHttp().getResponse().statusCode} \n`)),
      );
  }
}
