import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  imports: [MatToolbarModule],
})
export class TopNavComponent {
  title: string = 'YT Transcriptify';
}
