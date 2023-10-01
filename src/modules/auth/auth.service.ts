import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInArgsDto } from './dtos/args/sign-in-args.dto';
import { User } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { AuthedUser } from '../../core/types/authed-user.type';
import { SignUpArgsDto } from './dtos/args/sign-up-args.dto';
import { CreateUserPayloadDto } from '../users/dtos/payloads/create-user-payload.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // sign in.
  async signIn(signInRequestDto: SignInArgsDto): Promise<any> {
    const user: User = await this.usersService.findOneOrFailByEmail(
      signInRequestDto.email,
      'Wrong email or password.',
    );
    if (!(await compare(signInRequestDto.password, user.password))) {
      throw new UnauthorizedException('Wrong email or password.');
    }
    const accessToken: string = await this.jwtService.signAsync(<AuthedUser>{
      id: user.id,
    });
    return { user, accessToken };
  }

  // sign up.
  async signUp(signUpRequestDto: SignUpArgsDto): Promise<any> {
    const userByEmail: User = await this.usersService.findOneByEmail(
      signUpRequestDto.email,
    );
    if (userByEmail) {
      throw new BadRequestException('Email is already exist.');
    }
    const userByPhone: User = await this.usersService.findOneByPhone(
      signUpRequestDto.phone,
    );
    if (userByPhone) {
      throw new BadRequestException('Phone is already exist.');
    }
    const user: User = await this.usersService.create(
      new CreateUserPayloadDto({ ...signUpRequestDto }),
    );
    const accessToken: string = await this.jwtService.signAsync(<AuthedUser>{
      id: user.id,
    });
    return { user, accessToken };
  }
}
