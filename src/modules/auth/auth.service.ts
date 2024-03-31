import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/createUserDTO';
import { AppError } from 'src/common/constants/errors';
import { LoginUserDTO } from './dto/loginUserDTO';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from './responses/auth.user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const isExistUser = await this.userService.findUserByEmail(dto.email);
    if (isExistUser) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
    return await this.userService.createUser(dto);
  }
  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const findUser = await this.userService.findUserByEmail(dto.email);
    if (!findUser) {
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    }
    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException(AppError.WRONG_DATA);
    }
    const user = await this.userService.publicUser(dto.email);
    const jwtToken = await this.tokenService.generateUserJwt(user);
    return { user, token: jwtToken };
  }
}
