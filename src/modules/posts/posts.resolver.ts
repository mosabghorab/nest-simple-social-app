import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostArgsDto } from './dtos/args/create-post-args.dto';
import { PostsService } from './posts.service';
import { UpdatePostInputDto } from './dtos/inputs/update-post-input.dto';
import { GetAuthedUser } from '../../core/custom-decorators/get-authed-user.decorator';
import { AuthedUser } from '../../core/types/authed-user.type';
import { PostObjectType } from './post-object-type';
import { Post } from './post.model';
import { FindPostsArgsDto } from './dtos/args/find-posts-args.dto';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Mutation(() => PostObjectType, { nullable: true })
  createPost(
    @GetAuthedUser() authedUser: AuthedUser,
    @Args() createPostArgsDto: CreatePostArgsDto,
  ): Promise<any> {
    return this.postsService.create(authedUser.id, createPostArgsDto);
  }

  @Mutation(() => PostObjectType, { nullable: true })
  updatePost(
    @Args('id') id: string,
    @Args('fieldsToUpdate') updatePostInputDto: UpdatePostInputDto,
  ): Promise<any> {
    return this.postsService.update(id, updatePostInputDto);
  }

  @Query(() => [PostObjectType], { name: 'myPosts' })
  findMyPosts(
    @GetAuthedUser() authedUser: AuthedUser,
    @Args() findPostsArgsDto: FindPostsArgsDto,
  ): Promise<Post[]> {
    return this.postsService.findAll(findPostsArgsDto, authedUser.id);
  }

  @Query(() => [PostObjectType], { name: 'allPosts' })
  findAllPosts(@Args() findPostsArgsDto: FindPostsArgsDto): Promise<Post[]> {
    return this.postsService.findAll(findPostsArgsDto);
  }

  @Mutation(() => PostObjectType, { nullable: true })
  deletePost(@Args('id') id: string): Promise<any> {
    return this.postsService.delete(id);
  }
}
