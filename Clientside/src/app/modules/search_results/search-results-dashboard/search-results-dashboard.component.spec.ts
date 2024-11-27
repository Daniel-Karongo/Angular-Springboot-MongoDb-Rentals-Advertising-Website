import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsDashboardComponent } from './search-results-dashboard.component';

describe('SearchResultsDashboardComponent', () => {
  let component: SearchResultsDashboardComponent;
  let fixture: ComponentFixture<SearchResultsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
