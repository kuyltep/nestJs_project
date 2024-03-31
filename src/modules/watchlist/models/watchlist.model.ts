import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';

@Table
export class Watchlist extends Model {
  @Column
  name: string;

  @Column
  assetId: string;

  @ForeignKey(() => User)
  user: User;
}
