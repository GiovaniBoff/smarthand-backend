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

      this.logger.log('victory pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async middleFinger() {
    try {
      await Promise.all([
        await this.fingers.get('middle')?.extend(),
        this.fingers.get('pointer')?.contract(),
        this.fingers.get('thumb')?.contract(),
        this.fingers.get('ring')?.contract(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('middle finger pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async rock() {
    try {
      await Promise.all([
        this.fingers.get('middle').toPosition(100),
        await this.fingers.get('thumb')?.contract(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.contract(),
        this.fingers.get('ring')?.contract(),
        this.fingers.get('pinky')?.extend(),
      ]);

      this.logger.log('rock pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async hangLoose() {
    try {
      await Promise.all([
        this.fingers.get('middle').toPosition(100),
        await this.fingers.get('thumb')?.extend(),
        this.fingers.get('pointer')?.contract(),
        this.fingers.get('middle')?.contract(),
        this.fingers.get('ring')?.contract(),
        this.fingers.get('pinky')?.extend(),
      ]);

      this.logger.log('hangLoose pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async one() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.contract(),
        await this.fingers.get('ring')?.contract(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.contract(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('one pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async three() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.contract(),
        await this.fingers.get('ring')?.extend(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.extend(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('three pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async four() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.contract(),
        await this.fingers.get('ring')?.extend(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.extend(),
        this.fingers.get('pinky')?.extend(),
      ]);

      this.logger.log('four pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async five() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.extend(),
        await this.fingers.get('ring')?.extend(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.extend(),
        this.fingers.get('pinky')?.extend(),
      ]);

      this.logger.log('five pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async zero() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.contract(),
        await this.fingers.get('ring')?.contract(),
        this.fingers.get('pointer')?.contract(),
        this.fingers.get('middle')?.contract(),
        this.fingers.get('pinky')?.contract(),
      ]);

      this.logger.log('zero pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  @MovingVerification
  async dusGuri() {
    try {
      await Promise.all([
        this.fingers.get('thumb')?.contract(),
        await this.fingers.get('ring')?.contract(),
        this.fingers.get('pointer')?.extend(),
        this.fingers.get('middle')?.extend(),
        this.fingers.get('pinky')?.extend(),
      ]);

      this.logger.log('dusguri pose executed');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
