import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHolidayListComponent } from './detail-holiday-list.component';

describe('DetailHolidayListComponent', () => {
  let component: DetailHolidayListComponent;
  let fixture: ComponentFixture<DetailHolidayListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHolidayListComponent]
    });
    fixture = TestBed.createComponent(DetailHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
