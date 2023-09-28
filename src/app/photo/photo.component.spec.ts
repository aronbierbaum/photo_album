import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { PhotoComponent } from './photo.component';
import { Photo } from '../album.service';

describe('PhotoComponent', () => {
   let component: PhotoComponent;
   let fixture: ComponentFixture<PhotoComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [MatCardModule, MatDialogModule],
         declarations: [PhotoComponent]
      });
      fixture = TestBed.createComponent(PhotoComponent);
      component = fixture.componentInstance;
      const photo0 = new Photo(0, 1, 'Title', 'https://example.com', 'https://other.com');
      component.photo = photo0;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();

      component.onShowImage();
   });
});
