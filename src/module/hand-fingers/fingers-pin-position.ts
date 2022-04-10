import { FingersName } from '../hand-pose/hand-pose.service';

type fingerConfig = { pin: number; maxRange?: number };
export default function fingersPinPosition(): Map<
  FingersName,
  fingerConfig | null
> {
  const THUMB_PIN: fingerConfig = null; //11
  const INDEX_PIN: fingerConfig = { pin: 6 }; //6
  const MIDDLE_PIN: fingerConfig = null; //9
  const RING_PIN: fingerConfig = { pin: 10 }; //10
  const PINKY_PIN: fingerConfig = { pin: 5 }; //5

  return new Map([
    ['thumb', THUMB_PIN],
    ['pointer', INDEX_PIN],
    ['middle', MIDDLE_PIN],
    ['ring', RING_PIN],
    ['pinky', PINKY_PIN],
  ]);
}
