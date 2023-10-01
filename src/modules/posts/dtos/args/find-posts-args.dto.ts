import { IsOptional, IsString } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindPostsArgsDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  query?: string;
}
