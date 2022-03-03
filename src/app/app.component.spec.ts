// Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';

// Repo
import { AppComponent } from './app.component';
import { MockYtTranscriptionComponent } from './services/mock.components.spec';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatToolbarModule, RouterTestingModule],
        declarations: [AppComponent, MockYtTranscriptionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain(
      'Angular Yt Transcription'
    );
  });
});
