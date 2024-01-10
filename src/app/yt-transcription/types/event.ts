export type Event = {
  dDurationMs: number;
  tStartMs: number;
  id?: string;
  segs: Seg[];
};

export type Seg = {
  utf8: string;
};
