import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryComponent } from './leave-history.component';

describe('HistoryComponent', () => {
  let component: LeaveHistoryComponent;
  let fixture: ComponentFixture<LeaveHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveHistoryComponent]
    });
    fixture = TestBed.createComponent(LeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
