import { Subscription, first } from 'rxjs';

import { Component } from '@angular/core';
import { Album, AlbumService, Photo } from './album.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   /** List of known albums. */
   public albums: Album[] = [];

   /** Currently selected album. */
   public selectedAlbum: number = -1;

   /** List of photos in the current album. */
   public photos: Photo[] = [];

   /** Subscription to the services's observers. */
   private subscription: Subscription | null = null;
   private albumSub: Subscription | null = null;

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
      this.albumSub = this.albumSrv.albums$.subscribe((albums) => {
         this.albums = albums;
      });

      // Start with an initial album selected.
      this.albumSrv.updateAlbums().pipe(first()).subscribe((albums: Album[]) => {
         this.selectedAlbum = 1;
         this.albumSrv.setAlbum('1');
      })
   }

   /**
    * Called before Angular destroys the component.
    */
   ngOnDestroy(): void {
      // Unsubscribe from the observables.
      if (this.subscription != null) {
         this.subscription.unsubscribe();
         this.subscription = null;
      }
      if (this.albumSub != null) {
         this.albumSub.unsubscribe();
         this.albumSub = null;
      }
   }

   /**
    * Called when an album is selected by the user.
    */
   onAlbumChange(event: any) {
      this.albumSrv.setAlbum(event.value);
   }
}
