import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityDialogueCancelComponent } from './maternity-dialogue-cancel.component';

describe('MaternityDialogueCancelComponent', () => {
  let component: MaternityDialogueCancelComponent;
  let fixture: ComponentFixture<MaternityDialogueCancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityDialogueCancelComponent]
    });
    fixture = TestBed.createComponent(MaternityDialogueCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
