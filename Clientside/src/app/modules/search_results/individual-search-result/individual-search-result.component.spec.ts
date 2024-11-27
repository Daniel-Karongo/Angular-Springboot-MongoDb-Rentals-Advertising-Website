import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSearchResultComponent } from './individual-search-result.component';

describe('IndividualSearchResultComponent', () => {
  let component: IndividualSearchResultComponent;
  let fixture: ComponentFixture<IndividualSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
