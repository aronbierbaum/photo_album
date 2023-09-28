import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDialogComponent } from './photo-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PhotoDialogComponent', () => {
   let component: PhotoDialogComponent;
   let fixture: ComponentFixture<PhotoDialogComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ PhotoDialogComponent ],
         providers: [
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} }
         ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(PhotoDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      expect(component.loading).toBeTrue();
      component.onLoad()
      expect(component.loading).toBeFalse();
    });


});
