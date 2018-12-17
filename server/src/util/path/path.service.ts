import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PathService {
  private ROOT = path.join(__dirname, '..', '..');
  private CONFIG = path.join(this.ROOT, 'config');
  private CRYPTO = path.join(this.ROOT, 'crypto');

  constructor() {
  }

  get config(): string {
    return this.CONFIG;
  }

  get root(): string {
    return this.ROOT;
  }

  get crypto(): string {
    return this.CRYPTO;
  }
}
