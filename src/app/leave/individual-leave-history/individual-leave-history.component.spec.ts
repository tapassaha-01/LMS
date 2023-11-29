import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLeaveHistoryComponent } from './individual-leave-history.component';

describe('IndividualLeaveHistoryComponent', () => {
  let component: IndividualLeaveHistoryComponent;
  let fixture: ComponentFixture<IndividualLeaveHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualLeaveHistoryComponent]
    });
    fixture = TestBed.createComponent(IndividualLeaveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
