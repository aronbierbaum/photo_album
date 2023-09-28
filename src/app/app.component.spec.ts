import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AlbumService, Photo } from './album.service';

describe('AppComponent', () => {
   let service: AlbumService;
   let httpTestingController: HttpTestingController;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [HttpClientTestingModule, MatFormFieldModule, MatToolbarModule],
         declarations: [
            AppComponent
         ],
      }).compileComponents();

      service = TestBed.inject(AlbumService);
      httpTestingController = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      // Assert that there are no outstanding requests.
      httpTestingController.verify();
   });

   it('user can change the album', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();

      // When: The component is initialized we should request the initial albums.
      app.ngOnInit();
      const photo0 = new Photo(0, 1, 'Title', 'https://example.com', 'https://other.com');
      const request0 = httpTestingController.expectOne(
         req => req.method === 'GET' && req.url === 'https://jsonplaceholder.typicode.com/photos'
      );
      request0.flush([photo0]);
      expect(app.photos.length).toBe(1);

      // When: We set the album with mocked out call to photo service.
      const photo1 = new Photo(1, 10, 'Title', 'https://example.com', 'https://other.com');
      const photo2 = new Photo(2, 10, 'Title', 'https://example.com', 'https://other.com');
      app.albumId = '10';
      app.filterAlbum();
      const request1 = httpTestingController.expectOne(
         req => req.method === 'GET' && req.url === 'https://jsonplaceholder.typicode.com/photos'
      );
      request1.flush([photo1, photo2]);

      // Then: We should have two photos.
      expect(app.photos.length).toBe(2);

      // Disconnect from the album service.
      app.ngOnDestroy();
   });
});
