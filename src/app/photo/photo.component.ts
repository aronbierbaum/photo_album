import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Photo } from '../album.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
   /** Photo that we are showing. */
   @Input({ required: true }) photo!: Photo;
}
