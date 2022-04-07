import { FingersName } from '../hand-pose/hand-pose.service';

export default function fingersPinPosition(): Map<FingersName, number | null> {
  const THUMB_PIN = 5;
  const INDEX_PIN = null;
  const MIDDLE_PIN = 7;
  const RING_PIN = 8;
  const PINKY_PIN = 9;

  return new Map([
    ['thumb', THUMB_PIN],
    ['pointer', INDEX_PIN],
    ['middle', MIDDLE_PIN],
    ['ring', RING_PIN],
    ['pinky', PINKY_PIN],
  ]);
}
