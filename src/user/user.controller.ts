import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiTags('User')
  @ApiBody({ type: CreateUserDTO })
  @Post('create-user')
  createUser(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }
}
