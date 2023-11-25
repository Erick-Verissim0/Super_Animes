import { Payload } from '@/domain/contracts/gateways/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: Payload) {
    if (!payload.profiles) {
      throw new UnauthorizedException('Token invalid');
    }

    for (const profile of payload.profiles) {
      if (!profile.organization || !profile.profile) {
        throw new UnauthorizedException('Token invalid');
      }
    }
    const keyModule = 'PLN';
    const hasAccess = payload.profiles.filter((profile) => profile.profile.key_module === keyModule);
    if (!hasAccess) {
      throw new UnauthorizedException("You don't have access!");
    }
    if (hasAccess.length > 1) {
      throw new UnauthorizedException('You own more of the one organization');
    }
    const user = {
      id: payload.id,
      nm_user: payload.nm_user,
      organization: {
        id: hasAccess[0].organization.id,
        nm_organization: hasAccess[0].organization.nm_organization,
      },
    };
    return user;
  }
}
