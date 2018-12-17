import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiUseTags, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreatePeriodEventQueryDto } from '../dto/create-period-event-query.dto';
import { PeriodEventService } from '../services/period-event.service';

@ApiUseTags('api/period-events')
@Controller('api/period-events')
export class PeriodEventController {

  constructor(
    private readonly periodEvnetService: PeriodEventService,
  ) {
  }

  @ApiCreatedResponse({ description: 'Successfully created query and query values.' })
  @ApiBadRequestResponse({description: 'Invalid query.'})
  @Post('query')
  async findAll(
    @Body(new ValidationPipe()) createPeriodEventQuery: CreatePeriodEventQueryDto,
  ) {
    return await this.periodEvnetService.find(createPeriodEventQuery);
  }
}