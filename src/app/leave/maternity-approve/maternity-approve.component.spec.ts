import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityApproveComponent } from './maternity-approve.component';

describe('MaternityApproveComponent', () => {
  let component: MaternityApproveComponent;
  let fixture: ComponentFixture<MaternityApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityApproveComponent]
    });
    fixture = TestBed.createComponent(MaternityApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
