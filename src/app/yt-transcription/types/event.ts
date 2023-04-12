// Self
import { Seg } from './seg';

export interface Event {
  dDurationMs: number;
  tStartMs: number;
  id?: string;
  segs: Seg[];
}
