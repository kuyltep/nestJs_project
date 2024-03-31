import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { Repository } from 'sequelize-typescript';
import { WathclistDTO } from './dto/watchlist.dto';
import { CreateAssetResponse } from './responses';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}

  async createAsset(
    assetDto: WathclistDTO,
    user,
  ): Promise<CreateAssetResponse> {
    try {
      const watchlist = {
        name: assetDto.name,
        assetId: assetDto.assetId,
        user: +user.id,
      };
      return await this.watchlistRepository.create(watchlist);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(assetId: number, userId: number): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({
        where: {
          id: assetId,
          user: userId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
