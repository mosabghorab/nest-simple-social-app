import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { CreateUserPayloadDto } from './dtos/payloads/create-user-payload.dto';
import { UpdateUserPayloadDto } from './dtos/payloads/update-user-payload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // find one by id.
  findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  // find one or fail by id.
  async findOneOrFailById(id: string): Promise<User> {
    const user: User = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  // find one by email.
  findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  // find one or fail by email.
  async findOneOrFailByEmail(
    email: string,
    failureMessage?: string,
  ): Promise<User> {
    const user: User = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(failureMessage || 'User not found.');
    }
    return user;
  }

  // find one by phone.
  findOneByPhone(phone: string): Promise<User | null> {
    return this.userModel.findOne({ phone });
  }

  // find one or fail by phone.
  async findOneOrFailByPhone(
    phone: string,
    failureMessage?: string,
  ): Promise<User> {
    const user: User = await this.findOneByPhone(phone);
    if (!user) {
      throw new NotFoundException(failureMessage || 'User not found.');
    }
    return user;
  }

  // create.
  async create(createUserPayloadDto: CreateUserPayloadDto): Promise<User> {
    return (await this.userModel.create(createUserPayloadDto)).save();
  }

  // update.
  update(
    id: string,
    updateUserPayloadDto: UpdateUserPayloadDto,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserPayloadDto, { new: true })
      .exec();
  }

  // delete.
  delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
