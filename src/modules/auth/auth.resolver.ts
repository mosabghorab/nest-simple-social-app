import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInArgsDto } from './dtos/args/sign-in-args.dto';
import { SignUpArgsDto } from './dtos/args/sign-up-args.dto';
import { AuthObjectType } from './auth-object-type';
import { Public } from '../../core/metadata/public.metadata';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => AuthObjectType, { nullable: true })
  signIn(@Args() signInArgsDto: SignInArgsDto): Promise<any> {
    return this.authService.signIn(signInArgsDto);
  }

  @Public()
  @Mutation(() => AuthObjectType, { nullable: true })
  signUp(@Args() signUpArgsDto: SignUpArgsDto): Promise<any> {
    return this.authService.signUp(signUpArgsDto);
  }
}
