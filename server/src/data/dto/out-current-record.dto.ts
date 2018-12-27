import { ApiModelProperty } from '@nestjs/swagger';

export class OutCurrentRecordDto {
  @ApiModelProperty({
    type: String,
  })
  keyword: string;

  @ApiModelProperty({
    type: String,
    description: 'json string mapping key to value',
  })
  value: string;
}