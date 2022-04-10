import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HandFingersService } from './hand-fingers.service';

@WebSocketGateway({ namespace: '/fingers', cors: true })
export class HandFingersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly handFingersService: HandFingersService) {}

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('HandFingersGateway');
  private static readonly GESTURE_SIGNAL = 'GESTURE_SIGNAL';
  private readonly GESTURE_FEEDBACK = 'GESTURE_FEEDBACK';
  private static readonly READY_TO_PERFORM = '';

  afterInit(server: Server): void {
    this.logger.log(`=====> HandFingersGateway initialized!`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization;
    this.logger.log(`====> Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`====> Client disconnected: ${client.id}`);
  }

  //@UseGuards(AuthGuard)
  @SubscribeMessage(HandFingersGateway.GESTURE_SIGNAL)
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string
  ): void {
    this.server.emit(this.GESTURE_FEEDBACK, {
      status: 'MOVING',
      message: `Solicitaded gesture ${data}`,
      isAvailable: false,
    });
    this.handFingersService
      .doGesture(data)
      .then(() => {
        this.server.emit(this.GESTURE_FEEDBACK, 'WOrkou');
      })
      .catch((error) => {
        this.server.emit(this.GESTURE_FEEDBACK, `nao workou`);
      })
      .finally(() => {
        this.server.emit(this.GESTURE_FEEDBACK, {
          status: 'END MOVMENT',
          message: `The movement ${data} is finished`,
          isAvailable: true,
        });
      });
  }
}
