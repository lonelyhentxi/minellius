import { createTransport, getTestMessageUrl } from 'nodemailer';
import { ConfigService } from '../shared/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport(
      {
        host: this.configService.get('MAILER_HOST', String),
        port: this.configService.get('MAILER_PORT', Number),
        secure: this.configService.get('MAILER_SECURE', Boolean), // true for 465, false for other ports
        auth: {
          user: this.configService.get('MAILER_USER', String), // generated ethereal user
          pass: this.configService.get('MAILER_PASS', String), // generated ethereal password
        },
      },
    );

  }

  async send(mailOptions):Promise<{}> {
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