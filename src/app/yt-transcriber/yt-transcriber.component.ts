import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UrlService } from './../service/url.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'yt-transcriber',
  templateUrl: './yt-transcriber.component.html',
  styleUrls: ['./yt-transcriber.component.scss']
})
export class YtTranscriberComponent implements OnInit {
  linkControl = new FormControl(null, [Validators.required]);

  ytLinkGroup = new FormGroup({
    link: this.linkControl
  });

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {}

  submit(): void {
    const url: string = this.linkControl.value;

    this.urlService.getUrlContent(url).pipe(
      untilDestroyed(this)
    ).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    )
  }

}
