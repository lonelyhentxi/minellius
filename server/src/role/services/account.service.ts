import { Injectable } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import { User } from '../entities';
import { UsersService } from './users.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  async update(options: { id: number; user: User }) {
    const { user } = await this.usersService.findById(options);
    await this.usersService.assertUsernameAndEmail({
      id: options.id,
      email: options.user.email,
      username: options.user.username,
    });
    await user.setPassword(options.user.password);
    user.email = options.user.email?options.user.email:user.email;
    user.username = options.user.username?options.user.username:user.username;
    return await this.usersService.update({ id: options.id, item: user });
  }
}
