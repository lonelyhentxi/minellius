import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { PathService } from '../util/path/path.service';
import { ConfigService } from '../configs/services/config.service';

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
