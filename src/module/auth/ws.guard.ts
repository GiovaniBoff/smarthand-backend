import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard extends AuthGuard() implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authHeader: string = client.handshake.headers.authorization;

      return;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
  validateUser(payload: { user: string }): any {
    return payload;
  }
}
