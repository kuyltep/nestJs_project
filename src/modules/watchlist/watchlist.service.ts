import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Repository } from 'sequelize-typescript';
import { WathclistDTO } from './dto/watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}

  async createAsset(assetDto: WathclistDTO, user): Promise<Watchlist> {
    const watchlist = {
      name: assetDto.name,
      assetId: assetDto.assetId,
      user: +user.id,
    };
    return await this.watchlistRepository.create(watchlist);
  }

  async deleteAsset(assetId: number, userId: number): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: {
        id: assetId,
        user: userId,
      },
    });
    return true;
  }
}
