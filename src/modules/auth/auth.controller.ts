import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../user/dto/createUserDTO';
import { LoginUserDTO } from './dto/loginUserDTO';
import { AuthUserResponse } from './responses/auth.user.response';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
@ApiTags('API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ type: CreateUserDTO, status: 201 })
  registerUser(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthUserResponse, status: 200 })
  login(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({ required: true, name: 'Bearer' })
  @Post('test')
  test() {
    return true;
  }
}
