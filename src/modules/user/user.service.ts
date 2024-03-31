import { Injectable } from '@nestjs/common';
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
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          email: email,
        },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      const userObject = {
        firstName: dto.firstName,
        username: dto.username,
        email: dto.email,
        password: dto.password,
      };
      this.userRepository.create(userObject);
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }
  async publicUser(email: string): Promise<User> {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepository.update(dto, {
        where: {
          email,
        },
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(email: string) {
    try {
      return await this.userRepository.destroy({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
