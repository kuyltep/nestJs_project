import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UserResponse {
  @ApiProperty({ default: 'string', example: 'Vlad' })
  @IsString()
  firstName: string;
  @ApiProperty({ default: 'string', example: 'vlolo' })
  @IsString()
  username: string;
  @ApiProperty({ default: 'string', example: 'email@gmail.com' })
  @IsString()
  email: string;
  @ApiProperty({ default: 'string', example: '123456' })
  @IsString()
  password: string;
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty({ default: 'string' })
  @IsString()
  token: string;
}
