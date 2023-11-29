import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaveComponent } from './approve-leave.component';

describe('ApprovalComponent', () => {
  let component: ApproveLeaveComponent;
  let fixture: ComponentFixture<ApproveLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveLeaveComponent]
    });
    fixture = TestBed.createComponent(ApproveLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
