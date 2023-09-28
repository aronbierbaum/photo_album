import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


/**
 * Simple representation of an album.
 */
export class Album {
   id: number;
   userId: number;
   title: string;

   constructor(id: number, userId: number, title: string) {
      this.id = id;
      this.userId = userId;
      this.title = title;
   }
}


/**
 * Simple representation of a photo.
 */
export class Photo {
   id: number;
   albumId: number;
   title: string;
   url: string;
   thumbnailUrl: string;

   constructor(id: number, albumId: number, title: string, url: string, thumbnailUrl: string) {
      this.id = id;
      this.albumId = albumId;
      this.title = title;
      this.url = url;
      this.thumbnailUrl = thumbnailUrl;
   }
}


@Injectable({
   providedIn: 'root'
})
export class AlbumService {

   /** Subject that is updated when we get new photos. */
   protected photoSubject: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);
   photos$: Observable<Photo[]> = this.photoSubject as Observable<Photo[]>;

   /** Subject that is updated when we update albums. */
   protected albumSubject: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
   albums$: Observable<Album[]> = this.albumSubject as Observable<Album[]>;

   constructor(private http: HttpClient) { }

   /**
    * Set the current album to view photos for.
    *
    * @param albumId ID of the selected album.
    */
   setAlbum(albumId: string | null) {
      // If we have an empty album ID update subject with an empty array of photos.
      if (albumId == null || albumId == '') {
         this.photoSubject.next([]);
         return;
      }

      // Make request for the photos in the selected item.
      let params = new HttpParams();
      params = params.set('albumId', albumId);
      let res = this.http.get(
         'https://jsonplaceholder.typicode.com/photos', {
            params: {albumId: albumId}
         }
      );

      // When we receive the list of photos update the subject.
      res.subscribe(
         (data: any) => {
            this.photoSubject.next(data);
         }
      )
   }

   /**
    * Update the list of known albums.
    */
   updateAlbums(): Observable<Album[]> {
      let res = this.http.get(
         'https://jsonplaceholder.typicode.com/albums'
      );

      res.subscribe(
         (data: any) => {
            this.albumSubject.next(data);
         }
      )

      return this.albumSubject.asObservable();
   }
}
