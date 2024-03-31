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
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Watchlist')
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: WathclistDTO })
  @ApiResponse({ status: 201, type: WathclistDTO })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(@Body() assetDto: WathclistDTO, @Req() request) {
    const user = request.user;
    return this.watchlistService.createAsset(assetDto, user);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() request) {
    const { id: userId } = request.user;
    return this.watchlistService.deleteAsset(+assetId, +userId);
  }
}
