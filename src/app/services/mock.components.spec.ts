// Angular
import { Component, Input } from "@angular/core";

// https://stackoverflow.com/questions/41240163/mocking-child-components-angular-2
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'yt-transcription',
    template: ''
})

export class MockYtTranscriptionComponent {}


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'transcription',
    template: ''
})

export class MockTranscriptionComponent {
    @Input() captionSegments: string[];
}
