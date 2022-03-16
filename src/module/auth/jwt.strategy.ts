import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_SECRET_TOKEN,
    });
  }

  async validate(payload: { user: string }) {
    const { user } = payload;
    return user === process.env.AUTH_USER;
  }
}
