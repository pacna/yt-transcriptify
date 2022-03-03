// Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Repo
import { TranscriptionComponent } from './transcription.component';

describe('TranscriptionComponent', () => {
  let component: TranscriptionComponent;
  let fixture: ComponentFixture<TranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transcription', () => {
    // ARRANGE
    const mockResponse = ['testing result'];
    component.captionSegments = mockResponse;

    component.ngOnChanges();
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.transcription-container').innerText;

    // ASSERT
    expect(text).toEqual(mockResponse[0]);
  });
});
