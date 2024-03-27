import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/updateUserDTO';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { DeleteUserDTO } from './dto/deleteUserDTO';
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @ApiBearerAuth('JWT-auth')
  @Patch('update-user')
  async updateUser(
    @Body() updateDto: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserDTO> {
    return this.userService.updateUser(request.user.email, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-user')
  @ApiBody({ type: DeleteUserDTO })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('JWT-auth')
  deleteUser(@Req() request) {
    return this.userService.deleteUser(request.user.email);
  }
}
