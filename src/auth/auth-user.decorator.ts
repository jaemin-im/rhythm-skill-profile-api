import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((_, context: ExecutionContext) => {
  const { user } = GqlExecutionContext.create(context).getContext();
  return user;
});
