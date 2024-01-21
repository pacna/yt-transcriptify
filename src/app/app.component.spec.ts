import { TestBed } from '@angular/core/testing';
import {
  MockAppLayoutComponent,
  MockOverviewComponent,
  MockTopNavComponent,
} from './shared/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockAppLayoutComponent,
        MockTopNavComponent,
        MockOverviewComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
