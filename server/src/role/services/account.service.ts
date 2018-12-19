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
    try {
      await this.usersService.assertUsernameAndEmail({
        id: options.id,
        email: options.user.email,
        username: options.user.username,
      });
      let { user } = await this.usersService.findById(options);
      user = plainToClassFromExist(user, options.user);
      await user.setPassword(options.user.password);
      return await this.usersService.update({ id: options.id, item: user });
    } catch (error) {
      throw error;
    }
  }
}
