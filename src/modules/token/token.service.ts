import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateUserJwt(user) {
    const payload = { user };
    return await this.jwtService.sign(payload, {
      secret: this.configService.get('secret'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }
}
