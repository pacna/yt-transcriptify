import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MockAppLayoutComponent,
  MockOverviewComponent,
  MockTopNavComponent,
  SpiesService,
} from './shared/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      declarations: [
        MockAppLayoutComponent,
        MockTopNavComponent,
        MockOverviewComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: SpiesService.createHttpClientSpy() },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
