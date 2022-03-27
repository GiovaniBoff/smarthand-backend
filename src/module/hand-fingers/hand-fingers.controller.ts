import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HandFingersService } from './hand-fingers.service';

@Controller('api/finger')
// @UseGuards(AuthGuard('jwt'))
export class HandFingersController {
  constructor(private readonly handFingersService: HandFingersService) {}

  @Post('/on')
  turnLedOn(): any {
    this.handFingersService.doGesture();
    return {
      status: 'ligado',
    };
  }

  @Post('/off')
  turnLedOff(): any {
    // this.handFingersService.off();
    return {
      status: 'desligado',
    };
  }

  @Post('/strobe')
  strobe(): any {
    // this.handFingersService.strobe();
    return {};
  }
}
