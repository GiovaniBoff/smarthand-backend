import { FingersName } from '../hand-pose/hand-pose.service';

type fingerConfig = { pin: number; maxRange?: number };
export default function fingersPinPosition(): Map<
  FingersName,
  fingerConfig | null
> {
  const THUMB_PIN: fingerConfig = { pin: 9, maxRange: 160 }; //11 // range: 140
  const INDEX_PIN: fingerConfig = { pin: 6, maxRange: 160 }; //6 // range: 160
  const MIDDLE_PIN: fingerConfig = { pin: 11, maxRange: 130 }; //9 // range: 160
  const RING_PIN: fingerConfig = { pin: 10, maxRange: 160 }; //10 // range: 160
  const PINKY_PIN: fingerConfig = { pin: 5 }; //5 // range:130

  return new Map([
    ['thumb', THUMB_PIN],
    ['pointer', INDEX_PIN],
    ['middle', MIDDLE_PIN],
    ['ring', RING_PIN],
    ['pinky', PINKY_PIN],
  ]);
}
