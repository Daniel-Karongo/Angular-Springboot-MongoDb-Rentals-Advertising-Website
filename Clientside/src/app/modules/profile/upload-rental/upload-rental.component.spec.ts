import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRentalComponent } from './upload-rental.component';

describe('UploadRentalComponent', () => {
  let component: UploadRentalComponent;
  let fixture: ComponentFixture<UploadRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
