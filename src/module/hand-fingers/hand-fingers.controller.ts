import { Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { HandFingersService } from './hand-fingers.service';

@Controller('api/finger')
@UseGuards(AuthGuard('jwt'))
export class HandFingersController {
  constructor(private readonly handFingersService: HandFingersService) {}

  @Post('/on')
  turnLedOn(@Res() response: Response): any {
    try {
      const gestureName = this.handFingersService.doGesture('like');
      response.send({
        gesture: gestureName,
        enable: false,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
