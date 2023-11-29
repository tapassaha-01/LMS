import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDailogComponent } from './approval-dialog.component';

describe('DialogcComponent', () => {
  let component: ApprovalDailogComponent;
  let fixture: ComponentFixture<ApprovalDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalDailogComponent]
    });
    fixture = TestBed.createComponent(ApprovalDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
