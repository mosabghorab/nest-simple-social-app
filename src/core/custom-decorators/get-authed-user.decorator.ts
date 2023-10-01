import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// custom decorator for returning the user from the request.
export const GetAuthedUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const gqlExecutionContext: GqlExecutionContext =
      GqlExecutionContext.create(context);
    return gqlExecutionContext.getContext().req.user;
  },
);
