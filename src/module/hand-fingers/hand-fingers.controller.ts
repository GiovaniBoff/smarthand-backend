import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HandFingersService } from './hand-fingers.service';

@Controller('api/finger')
@UseGuards(AuthGuard('jwt'))
export class HandFingersController {
  constructor(private readonly handFingersService: HandFingersService) {
    this.handFingersService.setPin(3);
  }

  @Post('/on')
  turnLedOn(): any {
    this.handFingersService.on();
    return {
      status: 'ligado',
    };
  }

  @Post('/off')
  turnLedOff(): any {
    this.handFingersService.off();
    return {
      status: 'desligado',
    };
  }

  @Post('/strobe')
  strobe(): any {
    this.handFingersService.strobe();
    return {};
  }
}
