import { Gender } from '../../../../core/enums/gender.enum';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignUpArgsDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsPhoneNumber()
  phone: string;

  @Field(() => String)
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => String)
  @IsDate()
  @Transform(({ value }) => {
    const date: Date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  })
  dateOfBirth: Date;
}
