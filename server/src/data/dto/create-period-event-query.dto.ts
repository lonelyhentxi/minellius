import { EventType } from '../constants/event-type.constant';
import { PeriodEventEntityType } from '../constants/period-event-entity.constant';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { enumDestructe } from '../functools/enum.functool';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import * as dayjs from 'dayjs';

export class CreatePeriodEventQueryDto {
  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({
    type: String,
    format: 'date-time',
    example: dayjs().toISOString(),
  })
  readonly period?: string;

  @IsInt()
  @IsEnum(EventType)
  @IsOptional()
  @ApiModelPropertyOptional({
    type: Number,
    enum: enumDestructe(EventType, false)[1],
  })
  readonly eventType?: EventType;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  @ApiModelPropertyOptional({
    maxLength: 150,
    type: String,
  })
  readonly name?: string;

  @IsEnum(PeriodEventEntityType)
  @ApiModelProperty({
    type: String,
    enum: enumDestructe(PeriodEventEntityType, true)[1],
  })
  readonly entityType: PeriodEventEntityType;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional({
    type: Boolean,
  })
  numOrderDesc?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiModelPropertyOptional({
    type: Boolean,
  })
  periodOrderAsc?: boolean;

  @IsInt()
  @Min(0)
  @ApiModelProperty({
    type: Number,
    format: 'int',
  })
  skip: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiModelProperty({
    type: Number,
    format: 'int',
    example: 10,
  })
  take: number;
}