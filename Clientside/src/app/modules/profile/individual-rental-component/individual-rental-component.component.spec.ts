import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRentalComponentComponent } from './individual-rental-component.component';

describe('IndividualRentalComponentComponent', () => {
  let component: IndividualRentalComponentComponent;
  let fixture: ComponentFixture<IndividualRentalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualRentalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualRentalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
