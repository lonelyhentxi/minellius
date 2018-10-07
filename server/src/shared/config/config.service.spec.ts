import { Test, TestingModule } from '@nestjs/testing';
import { PathService } from '../path.service';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [PathService,ConfigService],
    }).compile();
  });

  describe('validate input', () => {
    it('should convert result', () => {
      const configService = app.get<ConfigService>(ConfigService);
      expect(configService.envConfig.NODE_ENV).toBe('development');
    });
  });
});
