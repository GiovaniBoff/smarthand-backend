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
      await Promise.all([
        this.fingers.get('middle').toPosition(100),
        await this.fingers.get('thumb')?.extend(),
        this.fingers.get('pointer')?.contract(),
        this.fingers.get('middle')?.contract(),
        this.fingers.get('ring')?.contract(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('like pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async victory() {
    try {
      await Promise.all([
        this.fingers.get('pointer')?.extend(),
        await this.fingers.get('middle')?.extend(),
        this.fingers.get('thumb')?.contract(),
        this.fingers.get('ring')?.contract(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('like pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
