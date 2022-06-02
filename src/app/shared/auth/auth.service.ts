import config from '$config';
import { TokenType } from '$types/enums';
import { ITokenPayload } from '$types/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(payload: ITokenPayload): string {
    return this.jwtService.sign(
      { ...payload, tokenType: TokenType.ACCESS_TOKEN },
      {
        secret: config.AUTH.JWT_SECRET_KEY,
        expiresIn: config.AUTH.JWT_ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  }

  public generateRefreshToken(payload: ITokenPayload): string {
    return this.jwtService.sign(
      { ...payload, tokenType: TokenType.REFRESH_TOKEN },
      {
        secret: config.AUTH.JWT_SECRET_KEY,
        expiresIn: config.AUTH.JWT_REFRESH_TOKEN_EXPIRES_IN,
      },
    );
  }

  public generateRegisterToken(payload: { phone: string; code: string }): string {
    return this.jwtService.sign(
      { ...payload, tokenType: TokenType.REGISTER_TOKEN },
      {
        secret: config.AUTH.JWT_SECRET_KEY,
        expiresIn: config.AUTH.REGISTER_CODE_EXPIRES_IN,
      },
    );
  }

  public verifyRegisterToken(registerTOken: string) {
    try {
      const payload = this.jwtService.verify(registerTOken, { secret: config.AUTH.JWT_SECRET_KEY });
      return payload?.tokenType === TokenType.REGISTER_TOKEN ? payload : false;
    } catch (error) {
      return false;
    }
  }

  public verifyAccessToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, { secret: config.AUTH.JWT_SECRET_KEY });
      return payload?.tokenType === TokenType.ACCESS_TOKEN ? payload : false;
    } catch (error) {
      return false;
    }
  }

  public verifyRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: config.AUTH.JWT_SECRET_KEY });
      return payload?.tokenType === TokenType.REFRESH_TOKEN ? payload : false;
    } catch (error) {
      return false;
    }
  }
}
