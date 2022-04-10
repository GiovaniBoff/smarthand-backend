import { Injectable, Logger } from '@nestjs/common';
import Finger from 'src/module/shared/util/finger';
import { MovingVerification } from '../shared/util/decorator/movingVerification';
export type FingersName = 'thumb' | 'pointer' | 'middle' | 'ring' | 'pinky';

@Injectable()
export class HandPoseService {
  private logger = new Logger(this.constructor.name);

  private fingers: Map<FingersName, Finger | undefined> = new Map();
  public isMoving = false;

  setFinger(fingerName: FingersName, finger: Finger): void {
    this.fingers.set(fingerName, finger);
  }

  setAllFinger(fingers: Map<FingersName, Finger>) {
    this.fingers = new Map(fingers);
  }

  @MovingVerification
  async likePose() {
    try {
      await this.fingers.get('thumb')?.extend();
      await this.fingers.get('pointer')?.contract();
      await this.fingers.get('middle')?.contract();
      await this.fingers.get('ring')?.contract();
      await this.fingers.get('pinky')?.contract();

      this.logger.log('like pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async victory() {
    try {
      await this.fingers.get('thumb')?.contract();
      await this.fingers.get('pointer')?.extend();
      await this.fingers.get('middle')?.extend();
      await this.fingers.get('ring')?.contract();
      await this.fingers.get('pinky')?.contract();

      this.logger.log('like pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
