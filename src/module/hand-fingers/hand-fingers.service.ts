import { Injectable } from '@nestjs/common';
import { Led } from 'johnny-five';
import BoardIntegrated from 'src/util/boardIntegrated.util';
import { UsingBoard } from 'src/util/UsingBoard';

@Injectable()
export class HandFingersService extends BoardIntegrated {
  private led!: Led;

  public async setPin(pin: number): Promise<void> {
    await this.waitBoardBeReady();
    this.pin = pin;
    this.led = new Led(pin);
  }

  @UsingBoard
  public on() {
    this.led.on();
  }

  @UsingBoard
  public off() {
    this.led.stop(0);
  }

  @UsingBoard
  public strobe() {
    this.led.strobe(150);
  }
}
