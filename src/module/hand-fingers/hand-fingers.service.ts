import { Injectable } from '@nestjs/common';
import { Led } from 'johnny-five';
import BoardIntegrated from 'src/util/boardIntegrated.util';

@Injectable()
export class HandFingersService extends BoardIntegrated {
  private led!: Led;

  public async setPin(pin: number): Promise<void> {
    await this.waitBoardBeReady();
    this.led = new Led(pin);
  }

  public on() {
    this.led.on();
  }

  public off() {
    this.led.off();
  }

  public strobe() {
    this.led.strobe(150);
  }
}
