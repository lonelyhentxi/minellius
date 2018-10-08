import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
  }

  async update(options: { id: number; user: User }) {
    try {
      let user = await this.usersRepository.findOneOrFail(options.id, {
        relations: ['groups', 'groups.permissions'],
      });
      user = plainToClassFromExist(user, options.user);
      await user.setPassword(options.user.password);
      user = await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
