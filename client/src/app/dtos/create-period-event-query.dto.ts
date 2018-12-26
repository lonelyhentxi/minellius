import { EventType } from '../constants/event-type.constant';
import { PeriodEventEntityType } from '../constants/period-event-entity.constant';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreatePeriodEventQueryDto {
  @IsDateString()
  readonly period: string;

  @IsInt()
  @IsEnum(EventType)
  @IsOptional()
  readonly eventType?: EventType;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  readonly name?: string;

  @IsEnum(PeriodEventEntityType)
  readonly entityType: PeriodEventEntityType;

  @IsBoolean()
  @IsOptional()
  numOrderDesc?: boolean;

  @IsBoolean()
  @IsOptional()
  periodOrderAsc?: boolean;

  @IsInt()
  @Min(0)
  skip: number;

  @IsInt()
  @Min(0)
  @Max(100)
  take: number;
}
