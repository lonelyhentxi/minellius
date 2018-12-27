import { ApiModelProperty } from '@nestjs/swagger';

export class OutPeriodEventDto {

  @ApiModelProperty({
    type: Number,
  })
  id: number;

  @ApiModelProperty({
    type: String,
  })
  name: string;

  @ApiModelProperty({
    type: Number,
  })
  eventType: number;

  @ApiModelProperty({
    type: String,
  })
  period: string;

  @ApiModelProperty({
    type: Number,
  })
  num: number;
}