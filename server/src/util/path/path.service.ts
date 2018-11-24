import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PathService {
  private ROOT = path.join(__dirname, '..', '..');
  private CONFIG = path.join(this.ROOT, 'config');

  constructor() {
  }

  get config(): string {
    console.log(this.CONFIG);
    return this.CONFIG;
  }

  get root(): string {
    return this.ROOT;
  }
}
