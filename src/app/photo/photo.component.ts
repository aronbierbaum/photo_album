import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Photo } from '../album.service';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
   /** Photo that we are showing. */
   @Input({ required: true }) photo!: Photo;

   constructor(public dialog: MatDialog) {
   }

   /**
    * Called when the user clicks on the image.
    */
   onShowImage() {
      // Show the full size image in a modal dialog.
      const dialogRef = this.dialog.open(
         PhotoDialogComponent, {
            data: {photo: this.photo}
         }
      );
   }
}
