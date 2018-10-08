import { Test, TestingModule } from '@nestjs/testing';
import { PathService } from '../../util/path/path.service';
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
      expect(configService.get().NODE_ENV).toBe('development');
    });
  });
});
