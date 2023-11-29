import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWfhDialogComponent } from './approve-wfh-dialog.component';

describe('ApproveWfhDialogComponent', () => {
  let component: ApproveWfhDialogComponent;
  let fixture: ComponentFixture<ApproveWfhDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveWfhDialogComponent]
    });
    fixture = TestBed.createComponent(ApproveWfhDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
