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

  private setupHand() {
    const fingers = this.getFingers();

    fingers.forEach((finger) => {
      this.handPoseService.setFinger(finger.id as FingersName, finger);
    });
  }

  private getFingers(): Finger[] {
    const fingersMap = fingersPinMap();

    const fingerList: Finger[] = [];

    for (const fingerKeyValue of fingersMap.entries()) {
      const fingerName = fingerKeyValue[0];
      const servoPort = fingerKeyValue[1];
      if (servoPort) {
        const finger = new Finger(
          fingerName,
          servoPort.pin,
          servoPort.maxRange,
        );
        fingerList.push(finger);
      }
    }

    return fingerList;
  }

  public async doGesture(gestureName: string): Promise<string> {
    // @TODO Select the gesture
    await this.handPoseService.doLikePose();

    return `Gesture ${gestureName} executed`;
  }
}
