import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/createUserDTO';
import { Repository } from 'sequelize-typescript';
import { UpdateUserDTO } from './dto/updateUserDTO';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>,
  ) {}
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    const userObject = {
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    };
    this.userRepository.create(userObject);
    return dto;
  }
  async publicUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Watchlist,
        required: false,
      },
    });
  }
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, {
      where: {
        email,
      },
    });
    return dto;
  }

  async deleteUser(email: string) {
    return await this.userRepository.destroy({
      where: {
        email,
      },
    });
  }
}
