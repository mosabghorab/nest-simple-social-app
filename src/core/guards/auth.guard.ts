import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PUBLIC_KEY } from '../metadata/public.metadata';
import { AuthedUser } from '../types/authed-user.type';
import { Helpers } from '../helpers/helpers';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<any>(
      PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    ) as boolean;
    if (isPublic) return true;
    const gqlExecutionContext: GqlExecutionContext =
      GqlExecutionContext.create(context);
    const request: any = gqlExecutionContext.getContext().req;
    const token: string = Helpers.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let authedUser: AuthedUser;
    try {
      authedUser = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      request.user = authedUser;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
