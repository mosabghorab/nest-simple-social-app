import { Field, ObjectType } from '@nestjs/graphql';
import { UserObjectType } from '../users/user-object-type';

@ObjectType()
export class AuthObjectType {
  @Field(() => String, { nullable: true })
  accessToken: string;

  @Field(() => UserObjectType)
  user: UserObjectType;
}
