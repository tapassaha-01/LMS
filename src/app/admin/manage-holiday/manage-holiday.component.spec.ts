import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHolidayComponent } from './manage-holiday.component';

describe('HolidayComponent', () => {
  let component: ManageHolidayComponent;
  let fixture: ComponentFixture<ManageHolidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageHolidayComponent]
    });
    fixture = TestBed.createComponent(ManageHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
