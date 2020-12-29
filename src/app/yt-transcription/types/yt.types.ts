export class YoutubeEventResponse {
    events: Event[];
}

export class Event {
    dDurationMs: number;
    segs: Seg[];
}

export class Seg {
    utf8: string;
}

export class YoutubeCaptionResponse {
    caption: string[];
}
