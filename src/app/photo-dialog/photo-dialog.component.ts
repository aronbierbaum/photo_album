import { Inject } from '@angular/core';
import { Component } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Photo } from '../album.service';

@Component({
   selector: 'app-photo-dialog',
   templateUrl: './photo-dialog.component.html',
   styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent {
   /** Photo that we are showing */
   photo: Photo;

   /** Flag that indicates we are loading the image. */
   loading: boolean = true

   constructor(
      @Inject(MAT_DIALOG_DATA) public data: any
   ) {
      this.photo = data.photo as Photo;
   }

   /** Called when the image has finished loading. */
   onLoad() {
      this.loading = false;
   }
}
