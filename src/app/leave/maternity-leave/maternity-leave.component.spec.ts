import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityLeaveComponent } from './maternity-leave.component';

describe('MaternityLeaveComponent', () => {
  let component: MaternityLeaveComponent;
  let fixture: ComponentFixture<MaternityLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityLeaveComponent]
    });
    fixture = TestBed.createComponent(MaternityLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
