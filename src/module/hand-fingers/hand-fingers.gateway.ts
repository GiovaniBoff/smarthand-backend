import { Logger, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: "/fingers", cors: true })
export class HandFingersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger("HandFingersGateway");

  afterInit(server: Server): void {
    this.logger.log(`=====> HandFingersGateway initialized!`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`====> Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`====> Client disconnected: ${client.id}`);
  }

  //@UseGuards(AuthGuard)
  @SubscribeMessage("send_message")
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string
  ): void {
    setInterval(() => {
      this.server.emit("receive_message", true);
      this.logger.log(data);
    }, 1000);
  }
}
