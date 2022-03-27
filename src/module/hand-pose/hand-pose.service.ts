import { Injectable, Logger } from '@nestjs/common';
import Finger from 'src/module/shared/util/finger';
export type FingersName = 'thumb' | 'pointer' | 'middle' | 'ring' | 'pinky';

@Injectable()
export class HandPoseService {
  private logger = new Logger(this.constructor.name);

  private fingers: Map<FingersName, Finger> = new Map();
  public onMovement = false;

  setFinger(fingerName: FingersName, finger: Finger): void {
    this.fingers.set(fingerName, finger);
  }

  setAllFinger(fingers: Map<FingersName, Finger>) {
    this.fingers = new Map(fingers);
  }

  async doLikePose() {
    if (!this.isReadyToMove()) {
      return;
    }

    this.onMovement = true;
    await this.fingers.get('thumb').extend();
    await this.fingers.get('pointer').contract();
    await this.fingers.get('middle').contract();
    await this.fingers.get('ring').contract();
    await this.fingers.get('pinky').contract();
    this.onMovement = false;
  }

  private isReadyToMove() {
    if (this.onMovement) {
      this.logger.warn('Try do a gesture while fingers in movement');
      return false;
    }

    return true;
  }
}
