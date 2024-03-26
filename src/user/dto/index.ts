import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDTO {
  @ApiProperty({ default: 'string', example: 'Vlad' })
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'string', example: 'Petlyuk' })
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ default: 'string', example: 'hello@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ default: 'string', example: '123456' })
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
