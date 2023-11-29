import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityApproveDialogueComponent } from './maternity-approve-dialogue.component';

describe('MaternityApproveDialogueComponent', () => {
  let component: MaternityApproveDialogueComponent;
  let fixture: ComponentFixture<MaternityApproveDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityApproveDialogueComponent]
    });
    fixture = TestBed.createComponent(MaternityApproveDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
