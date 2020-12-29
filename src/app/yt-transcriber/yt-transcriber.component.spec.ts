import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YtTranscriberComponent } from './yt-transcriber.component';

describe('YtTranscriberComponent', () => {
  let component: YtTranscriberComponent;
  let fixture: ComponentFixture<YtTranscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtTranscriberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtTranscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
