import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../../core/enums/gender.enum';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Post } from '../posts/post.model';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({
    type: String,
    set: (password: string) => hashSync(password, genSaltSync(10)),
  })
  password: string;

  @Prop({ type: String, unique: true })
  phone: string;

  @Prop({ type: String, enum: Object.values(Gender) })
  gender: Gender;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const UserSchema: mongoose.Schema<User> =
  SchemaFactory.createForClass(User);
