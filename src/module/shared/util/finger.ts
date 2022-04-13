import { Logger } from '@nestjs/common';
import { Servo } from 'johnny-five';
import { promisify } from 'util';
import BoardIntegrated from './boardIntegrated';
import { UsingBoard } from './decorator/usingBoard';
export default class Finger extends BoardIntegrated {
  private servo!: Servo;
  public id!: string;
  private readonly maxPosition: number;
  private readonly logger: Logger;
  private readonly MOVEMENT_TIMER = 1000;

  constructor(id: string, pin: number, maxPosition = 120) {
    super();
    this.id = id;
    this.pin = pin;
    this.maxPosition = maxPosition;
    this.logger = new Logger(`${this.constructor.name} - ID: ${this.id}`);

    this.connectToServo();
  }

  private async connectToServo() {
    try {
      await this.waitBoardBeReady();

      this.servo = new Servo({
        pin: this.pin,
        startAt: 0,
        range: [0, this.maxPosition],
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @UsingBoard
  public contract() {
    this.servo.to(this.servo.range[1], this.MOVEMENT_TIMER);
    return this.onCompleteMovement();
  }

  @UsingBoard
  public extend() {
    this.servo.to(this.servo.range[0], this.MOVEMENT_TIMER);
    return this.onCompleteMovement();
  }

  @UsingBoard
  public toPosition(deg: number) {
    this.servo.to(deg, this.MOVEMENT_TIMER);
    return this.onCompleteMovement();
  }

  public onCompleteMovement(): Promise<void> {
    // const servoEventPromisify = promisify(this.servo.on);
    // return servoEventPromisify('move:complete').catch((e) => {
    //   this.logger.error(`Error on finger ${e}`);
    // });

    return new Promise((resolve) => {
      this.logger.debug(
        `Servo from ${this.id} is on position: ${this.servo.value}`
      );
      const interval = setInterval(() => {
        clearInterval(interval);
        resolve();
      }, 2000);
    });
  }
}
