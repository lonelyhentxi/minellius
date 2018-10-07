import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MailService } from './mail.service';
import { PathService } from '../shared/path.service';
import { ConfigService } from '../shared/config/config.service';

describe('MailService', async () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [PathService, ConfigService, MailService],
    }).compile();
  });

  describe('mailer send basic test', () => {

    it('should send hello!"', async () => {
      const mailService = app.get<MailService>(MailService);
      expect(await mailService.send({
        from: `"info" <info@evernightfireworks.com>`, // sender address
        to: 'master@evernightfireworks.com', // list of receivers
        subject: 'Hello test', // Subject line
        text: 'Hello test', // plain text body
        html: '<b>Hello test</b>',
      })).toEqual(undefined);
    });
  });
});
