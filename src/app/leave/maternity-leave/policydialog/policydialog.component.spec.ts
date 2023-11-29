import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicydialogComponent } from './policydialog.component';

describe('PolicydialogComponent', () => {
  let component: PolicydialogComponent;
  let fixture: ComponentFixture<PolicydialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicydialogComponent]
    });
    fixture = TestBed.createComponent(PolicydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
