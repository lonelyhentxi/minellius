import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { ContentTypeDto } from './content-type.dto';

export class PermissionDto {
  id: number;
  @MaxLength(100)
  name: string;
  @MaxLength(255)
  title: string;
  @Type(() => ContentTypeDto)
  contentType: ContentTypeDto;
}
