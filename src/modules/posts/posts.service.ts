import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Post } from './post.model';
import { CreatePostArgsDto } from './dtos/args/create-post-args.dto';
import { UpdatePostInputDto } from './dtos/inputs/update-post-input.dto';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { FindPostsArgsDto } from './dtos/args/find-posts-args.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly usersService: UsersService,
  ) {}

  // find one by id.
  findOneById(id: string): Promise<Post | null> {
    return this.postModel.findById(id);
  }

  // find one or fail by id.
  async findOneOrFailById(id: string): Promise<Post> {
    const post: Post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  // find all.
  findAll(
    findPostsArgsDto: FindPostsArgsDto,
    userId?: string,
  ): Promise<Post[]> {
    let filter: FilterQuery<Post> = {};
    if (userId) {
      filter = { user: userId };
    }
    if (findPostsArgsDto.query) {
      const regex = new RegExp(`.*${findPostsArgsDto.query}.*`, 'i');
      filter = { ...filter, title: regex };
    }
    return this.postModel.find(filter).populate('user');
  }

  // create.
  async create(
    userId: string,
    createPostRequestDto: CreatePostArgsDto,
  ): Promise<Post> {
    const user: User = await this.usersService.findOneOrFailById(userId);
    const post: Post = await this.postModel.create(createPostRequestDto);
    post.user = user;
    return post.save();
  }

  // update.
  update(id: string, updatePostRequestDto: UpdatePostInputDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostRequestDto, {
      new: true,
    });
  }

  // delete.
  delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id);
  }
}
