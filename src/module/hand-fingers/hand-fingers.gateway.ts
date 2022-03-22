import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class HandFingersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('HandFingersGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
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
