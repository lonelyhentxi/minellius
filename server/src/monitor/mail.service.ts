import { createTransport, getTestMessageUrl,SendMailOptions } from 'nodemailer';
import { ConfigService } from '../shared/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter;
  constructor(private readonly configService: ConfigService) {
    const { MAILER_HOST,MAILER_PORT,MAILER_SECURE,MAILER_USER,MAILER_PASS } = this.configService.envConfig;
    this.transporter = createTransport(
      {
        host: MAILER_HOST,
        port: MAILER_PORT,
        secure: MAILER_SECURE, // true for 465, false for other ports
        auth: {
          user: MAILER_USER, // generated ethereal user
          pass: MAILER_PASS, // generated ethereal password
        },
      },
    );

  }

  async send(mailOptions:SendMailOptions):Promise<{}> {
    const me = this;
    return await new Promise((resolve, reject) => {
      me.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve();
        // Preview only available when sending through an Ethereal account
      });
    });
  }
}