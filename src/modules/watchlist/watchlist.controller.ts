import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { WathclistDTO } from './dto/watchlist.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAssetResponse } from './responses';

@ApiTags('Watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: WathclistDTO })
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WathclistDTO,
    @Req() request,
  ): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchlistService.createAsset(assetDto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request) {
    const { id: userId } = request.user;
    return this.watchlistService.deleteAsset(+assetId, +userId);
  }
}
