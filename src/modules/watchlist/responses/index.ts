import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/user/models/user.model';

export class CreateAssetResponse {
  @ApiProperty({ example: 'user', default: 'user' })
  @IsNotEmpty()
  user: User;
  @ApiProperty({ example: 'name', default: 'string' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'assetId', default: 'string' })
  @IsString()
  assetId: string;
}
