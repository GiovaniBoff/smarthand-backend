import { Logger } from '@nestjs/common';
import { Servo } from 'johnny-five';
import { promisify } from 'util';
import BoardIntegrated from './boardIntegrated';
import { UsingBoard } from './decorator/usingBoard';
export default class Finger extends BoardIntegrated {
  private servo!: Servo;
  public id!: string;
  private readonly MAXIMUM_POSITION = 120;
  private readonly logger: Logger;

  constructor(id: string, pin: number) {
    super();
    this.id = id;
    this.pin = pin;
    this.logger = new Logger(`${this.constructor.name} - ID: ${this.id}`);

    this.connectToServo();
  }

  private async connectToServo() {
    try {
      await this.waitBoardBeReady();

      this.servo = new Servo({
        pin: this.pin,
        startAt: 0,
        range: [0, this.MAXIMUM_POSITION],
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @UsingBoard
  public contract() {
    this.servo.max();
    return this.onCompleteMovement();
  }

  @UsingBoard
  public extend() {
    this.servo.min();
    return this.onCompleteMovement();
  }

  @UsingBoard
  public toPosition(deg: number) {
    this.servo.to(deg);
    return this.onCompleteMovement();
  }

  public onCompleteMovement(): Promise<void> {
    const onResolve = promisify(this.servo.on);
    return onResolve('move:complete');
  }
}
