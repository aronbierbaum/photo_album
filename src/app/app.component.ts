import { Subscription } from 'rxjs';

import { Component } from '@angular/core';
import { AlbumService, Photo } from './album.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   /** Set initial value for album. */
   albumId: string = '';

   /** List of photos in the current album. */
   public photos: Photo[] = [];

   /** Subscription to the services's observers. */
   private subscription: Subscription | null = null;

   constructor(private albumSrv: AlbumService) {
   }

   /**
    * Called after all data-bound properties are initialized.
    */
   ngOnInit(): void {
      // Connect to album services photo observable.
      this.subscription = this.albumSrv.photos$.subscribe((photos) => {
         this.photos = photos;
      });


      // Start with an initial album selected.
      this.albumId = '1';
      this.albumSrv.setAlbum('1');
   }

   /**
    * Called before Angular destroys the component.
    */
   ngOnDestroy(): void {
      // Unsubscribe from the observable.
      if (this.subscription != null) {
         this.subscription.unsubscribe();
         this.subscription = null;
      }
   }

   /**
    * Called when the album ID has been changed.
    */
   filterAlbum() {
      this.albumSrv.setAlbum(this.albumId);
   }
}
