import { Body, Controller, HttpCode, HttpStatus, Logger, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { InAccountDto } from '../dto/in-account.dto';
import { OutAccountDto } from '../dto/out-account.dto';
import { User } from '../entities/user.entity';
import { AccessGuard } from '../guards/access.guard';
import { AccountService } from '../services/account.service';
import { UsersService } from '../services/users.service';

@ApiUseTags('account')
@Controller('/api/account')
@UseGuards(AccessGuard)
export class AccountController {
  constructor(
    private accountService: AccountService,
    private usersService: UsersService,
              ) {
  }

  @ApiBearerAuth()
  @Permissions('change_profile')
  @HttpCode(HttpStatus.OK)
  @Post('/update')
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutAccountDto,
    description: 'Successfully update account info',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad in value type validation',
  })
  async update(@Req() req, @Body() accountDto: InAccountDto) {
    Logger.log(`User ${req.user.id} try to update account`);
    const { user } = await this.usersService.findById({id:req.user.id});
    if (!await user.validatePassword(accountDto.currentPassword)) {
      throw new UnauthorizedException('Wrong current password');
    }
    return plainToClass(
      OutAccountDto,
      await this.accountService.update({
        id: user.id,
        user: {
          username: accountDto.username,
          email: accountDto.email,
          password: accountDto.password,
        } as User,
      }),
    );
  }
}
