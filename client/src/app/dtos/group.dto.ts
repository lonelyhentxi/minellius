import { MaxLength } from 'class-validator';

export class GroupDto {
  id: number;
  @MaxLength(100)
  name: string;
  @MaxLength(255)
  title: string;
}
