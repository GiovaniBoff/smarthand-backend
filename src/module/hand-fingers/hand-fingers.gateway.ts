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

@WebSocketGateway({ namespace: '', cors: true })
export class HandFingersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('HandFingersGateway');

  //@UseGuards(AuthGuard)
  @SubscribeMessage('send_message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string
  ): void {
    this.server.emit('receive_message', data);
    this.logger.log(data);
  }

  afterInit(server: Server): void {
    this.logger.log(`=====> HandFingersGateway initialized!`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`====> Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`====> Client disconnected: ${client.id}`);
  }
}
