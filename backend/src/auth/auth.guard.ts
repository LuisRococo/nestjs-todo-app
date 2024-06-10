import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    let request = context.switchToHttp().getRequest();

    if (!request) {
      request = GqlExecutionContext.create(context).getContext().req;
    }

    return !!request.user;
  }
}
