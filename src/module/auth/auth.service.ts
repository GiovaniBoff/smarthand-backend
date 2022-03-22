import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    const isUserValitaded = await this.validateUser(authCredentialsDto);

    if (!isUserValitaded) {
      throw new UnauthorizedException('Invalids Credentials');
    }

    const token = this.generateToken(authCredentialsDto.user);

    return { token };
  }

  private validateUser(authCredentialsDto: AuthCredentialsDto): boolean {
    const { user, password } = authCredentialsDto;

    return (
      user === process.env.AUTH_USER && password === process.env.AUTH_PASSWORD
    );
  }

  private generateToken(user: string): string {
    const payload = { user };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
