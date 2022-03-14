import { Controller, Post } from '@nestjs/common';
import { HandFingersService } from './hand-fingers.service';

@Controller('api/finger')
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
