import { Injectable } from '@nestjs/common';
import Finger from 'src/module/shared/util/finger';
import { FingersName, HandPoseService } from '../hand-pose/hand-pose.service';

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
    const fingersMap: Map<FingersName, number> = new Map([
      ['thumb', 10],
      ['pointer', 11],
      ['middle', 44],
      ['ring', 12],
      ['pinky', 55],
    ]);

    const fingerList: Finger[] = [];

    for (const fingerKeyValue of fingersMap.entries()) {
      const fingerName = fingerKeyValue[0];
      const servoPort = fingerKeyValue[1];
      const finger = new Finger(fingerName, servoPort);
      await finger.waitBoardBeReady();
      fingerList.push(finger);
    }

    return fingerList;
  }

  public doGesture() {
    // @TODO Select the gesture
    this.handPoseService.doLikePose();
  }
}
