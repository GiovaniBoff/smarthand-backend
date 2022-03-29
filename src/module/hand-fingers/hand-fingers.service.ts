import { Injectable } from '@nestjs/common';
import Finger from 'src/module/shared/util/finger';
import { FingersName, HandPoseService } from '../hand-pose/hand-pose.service';
import fingersPinMap from './fingers-pin-position';

@Injectable()
export class HandFingersService {
  public moving: boolean;

  constructor(private readonly handPoseService: HandPoseService) {
    this.setupHand();
  }

  private async setupHand() {
    const fingers = await this.getFingers();

    fingers.forEach((finger) => {
      this.handPoseService.setFinger(finger.id as FingersName, finger);
    });
  }

  private async getFingers(): Promise<Finger[]> {
    const fingersMap = fingersPinMap();

    const fingerList: Finger[] = [];

    for (const fingerKeyValue of fingersMap.entries()) {
      const fingerName = fingerKeyValue[0];
      const servoPort = fingerKeyValue[1];
      if (servoPort) {
        const finger = new Finger(fingerName, servoPort);
        await finger.waitBoardBeReady();
        fingerList.push(finger);
      }
    }

    return fingerList;
  }

  public doGesture(gestureName: string): string {
    // @TODO Select the gesture
    this.handPoseService.doLikePose();

    return `Gesture ${gestureName} executed`;
  }
}
