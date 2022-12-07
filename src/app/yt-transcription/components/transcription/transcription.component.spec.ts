// Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Self
import { TranscriptionComponent } from './transcription.component';

describe('TranscriptionComponent', () => {
  let component: TranscriptionComponent;
  let fixture: ComponentFixture<TranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transcription', () => {
    // ARRANGE
    const mockCaptionSegments: string[] = ['foo', 'bar'];

    // ACT
    component.transcription = mockCaptionSegments;
    fixture.detectChanges();
    const paragraphs: any[] = fixture.nativeElement.querySelectorAll('p');

    // ASSERT
    expect(paragraphs).not.toBe(null);
    expect(paragraphs?.length).toBe(mockCaptionSegments.length);
    expect(paragraphs[0].innerText).toContain(mockCaptionSegments[0]);
    expect(paragraphs[1].innerText).toContain(mockCaptionSegments[1]);
  });
});
