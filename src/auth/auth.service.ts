import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, response: Response) {
    const expires = new Date();

    const jwtExpiration = this.configService.getOrThrow(
      'JWT_EXPIRATION',
    ) as ms.StringValue;

    expires.setMilliseconds(expires.getMilliseconds() + ms(jwtExpiration));

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: expires,
    });
    return { tokenPayload };
  }
  async verifyUser(email: string, password: string) {
    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const authenticated = await bcrypt.compare(password, user.password);

    if (!authenticated) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
