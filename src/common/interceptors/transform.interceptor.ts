import * as NestCommon from '@nestjs/common';
import * as RX from 'rxjs';
import * as RXOperators from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

@NestCommon.Injectable()
export class TransformInterceptor<T> implements NestCommon.NestInterceptor<T, Response<T>> {
    public intercept(context: NestCommon.ExecutionContext, next: NestCommon.CallHandler): RX.Observable<Response<T>> {
        return next.handle().pipe(
            RXOperators.map((data) => {
                const statusCode = context.switchToHttp().getResponse().statusCode;
                return {
                    statusCode: statusCode,
                    message: statusCode >= 200 && statusCode < 300 ? 'OK' : 'ERROR',
                    data,
                };
            })
        );
    }
}
