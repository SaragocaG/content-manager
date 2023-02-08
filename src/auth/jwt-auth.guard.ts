import { Injectable } from '@nestjs/common';
import { GqlExecutionContext, Context } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: any): Request {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request
    }
}
