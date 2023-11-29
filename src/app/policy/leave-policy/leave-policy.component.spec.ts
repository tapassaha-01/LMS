import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePolicyComponent } from './leave-policy.component';

describe('LeavePolicyComponent', () => {
  let component: LeavePolicyComponent;
  let fixture: ComponentFixture<LeavePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavePolicyComponent]
    });
    fixture = TestBed.createComponent(LeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
