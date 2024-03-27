import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ default: 'string', example: 'Vlad' })
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'string', example: 'vlolo' })
  @IsString()
  username: string;

  @ApiProperty({ default: 'string', example: 'mail@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;
}
