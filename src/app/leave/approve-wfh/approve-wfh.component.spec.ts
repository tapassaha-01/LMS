import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWFHComponent } from './approve-wfh.component';

describe('ApproveWFHComponent', () => {
  let component: ApproveWFHComponent;
  let fixture: ComponentFixture<ApproveWFHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveWFHComponent]
    });
    fixture = TestBed.createComponent(ApproveWFHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
