import { ApiModelProperty } from '@nestjs/swagger';
export class UnbindDto {
  @ApiModelProperty()
  provider: string;
}