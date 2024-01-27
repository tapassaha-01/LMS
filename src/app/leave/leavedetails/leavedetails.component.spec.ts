import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavedetailsComponent } from './leavedetails.component';

describe('LeavedetailsComponent', () => {
  let component: LeavedetailsComponent;
  let fixture: ComponentFixture<LeavedetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavedetailsComponent]
    });
    fixture = TestBed.createComponent(LeavedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
