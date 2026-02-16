import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOption } from 'passport-linkedin-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL as string,
      scope: ['r_emailaddress', 'r_liteprofile'],
    } as StrategyOption);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const oauthData = {
      oauthId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarUrl: photos && photos.length > 0 ? photos[0].value : null,
      provider: 'linkedin' as const,
    };

    const user = await this.authService.validateOAuthUser(oauthData);
    done(null, user || undefined);
  }
}
