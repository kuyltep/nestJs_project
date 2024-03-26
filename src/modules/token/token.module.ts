import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [JwtModule, ConfigModule],
})
export class TokenModule {}
