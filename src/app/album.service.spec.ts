import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlbumService, Photo } from './album.service';

describe('AlbumService', () => {
   let service: AlbumService;
   let httpTestingController: HttpTestingController;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule]
      });
      service = TestBed.inject(AlbumService);
      httpTestingController = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      // Assert that there are no outstanding requests.
      httpTestingController.verify();
   });

   it('should have default state and services when constructed', () => {
      expect(service['http']).toBeTruthy();
   });


   it('should allow subscribing and unsubscribing', () => {
      let subscription = service.photos$.subscribe((photos) => {
         // While subscribing we should get the initial list of photos.
         expect(photos.length).toBe(0);
      });

      // NOTE: We have to unsubscribe from the observable first so that the
      //       test case above doesn't get called again.
      subscription.unsubscribe();

      // When: We set the album with mocked out call to photo service.
      service.setAlbum('1');
      const photo0 = new Photo(10, 1, 'Title', 'https://example.com', 'https://other.com');
      const request0 = httpTestingController.expectOne(
         req => req.method === 'GET' && req.url === 'https://jsonplaceholder.typicode.com/photos'
      );
      request0.flush([photo0]);

      // Then: The subject should have a single photo.
      let value = service["photoSubject"].getValue();
      expect(value.length).toBe(1);

      // When: The album is set to null
      service.setAlbum(null);
      // Then: The subject should have an empty list.
      value = service["photoSubject"].getValue();
      expect(value.length).toBe(0);
   });

});
