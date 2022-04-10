import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Socket } from 'socket.io';
import { HandFingersService } from './hand-fingers.service';

@Controller('api/finger')
//@UseGuards(AuthGuard())
export class HandFingersController {
  private readonly LOGGER = new Logger(this.constructor.name);
  constructor(private readonly handFingersService: HandFingersService) {}

  @Get('/on')
  async turnLedOn(@Res() response: Response): Promise<any> {
    try {
      const gestureName = await this.handFingersService.doGesture('like');
      response.send({
        gesture: gestureName,
        enable: false,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
