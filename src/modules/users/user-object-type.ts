import { Gender } from '../../core/enums/gender.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostObjectType } from '../posts/post-object-type';

@ObjectType()
export class UserObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  gender: Gender;

  @Field(() => Date)
  dateOfBirth: Date;

  @Field(() => [PostObjectType], { nullable: true })
  posts: PostObjectType[];
}
