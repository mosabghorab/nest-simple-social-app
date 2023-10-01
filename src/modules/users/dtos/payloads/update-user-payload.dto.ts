import { Gender } from '../../../../core/enums/gender.enum';

export class UpdateUserPayloadDto {
  name: string;
  gender: Gender;
  dateOfBirth: Date;

  constructor(data: { name: string; gender: Gender; dateOfBirth: Date }) {
    Object.assign(this, data);
  }
}
