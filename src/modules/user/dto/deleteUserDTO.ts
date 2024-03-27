import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserDTO {
  @ApiProperty({ default: 'string', example: 'hello@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
