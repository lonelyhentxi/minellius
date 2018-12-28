import { Injectable } from '@nestjs/common';
import {InjectRepository } from '@nestjs/typeorm';
import { CurrentRecordEntity } from '../entities/current-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrentRecordService {
  constructor(
    @InjectRepository(CurrentRecordEntity)
    private readonly currentRecordRepo: Repository<CurrentRecordEntity>
  ) {}

  async findAll(): Promise<CurrentRecordEntity[]> {
    return await this.currentRecordRepo.find();
  }
}