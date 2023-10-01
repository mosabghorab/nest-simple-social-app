import { Gender } from '../../../../core/enums/gender.enum';

export class CreateUserPayloadDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: Gender;
  dateOfBirth: Date;

  constructor(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: Gender;
    dateOfBirth: Date;
  }) {
    Object.assign(this, data);
  }
}
