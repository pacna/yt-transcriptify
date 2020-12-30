// Repo
import { YoutubeCaptionService } from '../service/youtube-caption.service';

// https://stackoverflow.com/questions/63578246/why-should-we-use-jasmine-spy-object-in-angular-unit-testing
export const mockYtCaptionService: jasmine.SpyObj<YoutubeCaptionService> = jasmine.createSpyObj('YoutubeCaption', ['getCaptions, getUrlHtmlContent']);
