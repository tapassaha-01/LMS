import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassDialogueComponent } from './change-pass-dialogue.component';

describe('ChangePassDialogueComponent', () => {
  let component: ChangePassDialogueComponent;
  let fixture: ComponentFixture<ChangePassDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassDialogueComponent]
    });
    fixture = TestBed.createComponent(ChangePassDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
