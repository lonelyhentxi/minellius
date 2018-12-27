import { AccessGuard } from '../../role/guards/access.guard';
import { OutPeriodEventDto } from './../dto/out-period-event.dto';
import { Body, Controller, Request, Post, ValidationPipe, HttpStatus, UseGuards, Session, HttpCode, Logger } from '@nestjs/common';
import { ApiUseTags, ApiBadRequestResponse, ApiCreatedResponse, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreatePeriodEventQueryDto } from '../dto/create-period-event-query.dto';
import { PeriodEventService } from '../services/period-event.service';
import { plainToClass } from 'class-transformer';

@ApiUseTags('period-events')
@Controller('api/period-events')
@UseGuards(AccessGuard)
export class PeriodEventController {

  constructor(
    private readonly periodEventService: PeriodEventService,
  ) {
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Successfully created query and query values.', type: OutPeriodEventDto, isArray: true })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBadRequestResponse({description: 'Invalid query.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('query')
  async find(
    @Request() req,
    @Body(new ValidationPipe()) createPeriodEventQuery: CreatePeriodEventQueryDto,
  ): Promise<OutPeriodEventDto[]> {
    Logger.log(`${req.user?req.user.id:''} try to`,PeriodEventService.name+':query');
    const entities = await this.periodEventService.find(createPeriodEventQuery);
    return plainToClass(OutPeriodEventDto,entities);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Successfully created query and count values.', type: Number })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBadRequestResponse({description: 'Invalid query.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('count')
  async count(
    @Request() req,
    @Body(new ValidationPipe()) createPeriodEventQuery: CreatePeriodEventQueryDto,
  ): Promise<number> {
    Logger.log(`${req.user?req.user.id:''} try to access`,PeriodEventService.name+':count');
    return await this.periodEventService.count(createPeriodEventQuery);
  }
}