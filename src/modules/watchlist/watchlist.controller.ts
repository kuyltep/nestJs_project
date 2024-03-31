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

  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  getAllAssets(@Req() request) {
    const user = request.user;
    return this.watchlistService;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateAsset() {
    return this.watchlistService;
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') id: string) {
    return this.watchlistService;
  }
}
