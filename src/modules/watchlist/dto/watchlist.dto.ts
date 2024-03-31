import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WathclistDTO {
  @ApiProperty({ default: 'string', example: 'watchlist' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'string', example: 'asset_id' })
  @IsNotEmpty()
  @IsString()
  assetId: string;
}
