import { Injectable, UnauthorizedException } from '@nestjs/common'; // დაამატე UnauthorizedException
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';
import { UsersService } from '../../users/users.service'; // შემოიტანე UsersService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService, // დააინექტირე სერვისი
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  // NestJS ავტომატურად გამოიძახებს ამას, თუ ტოკენი ვალიდურია
  async validate(payload: TokenPayload) {
    // ბაზიდან ამოგვაქვს მომხმარებელი ID-ით
    const user = await this.usersService.getUser({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    // რასაც აქ დააბრუნებ, ის იქნება შენი @CurrentUser
    return user;
  }
}
