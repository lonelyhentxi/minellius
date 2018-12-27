import { Controller, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CurrentRecordService } from '../services/current-record.service';
import { plainToClass } from 'class-transformer';
import { OutCurrentRecordDto } from '../dto/out-current-record.dto';
import { AccessGuard } from '../../role';

@ApiUseTags('current-record')
@Controller('api/current-record')
@UseGuards(AccessGuard)
export class CurrentRecordController {
  constructor(
    private readonly currentRecordService: CurrentRecordService,
  ) {
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all current records',
  })
  @HttpCode(HttpStatus.OK)
  @Get('current-records')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'unauthorized',
  })
  async find(): Promise<OutCurrentRecordDto[]> {
    const entities = await this.currentRecordService.findAll();
    return plainToClass(OutCurrentRecordDto, entities);
  }
}