import { Field, ObjectType } from '@nestjs/graphql';
import { UserObjectType } from '../users/user-object-type';

@ObjectType()
export class PostObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserObjectType, { nullable: true })
  user: UserObjectType;
}
