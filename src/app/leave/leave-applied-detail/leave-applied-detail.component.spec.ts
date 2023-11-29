import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAppliedDetailComponent } from './leave-applied-detail.component';

describe('LeaveAppliedDetailComponent', () => {
  let component: LeaveAppliedDetailComponent;
  let fixture: ComponentFixture<LeaveAppliedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveAppliedDetailComponent]
    });
    fixture = TestBed.createComponent(LeaveAppliedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
