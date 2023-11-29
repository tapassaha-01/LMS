import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueCancelComponent } from './dialogue-cancel.component';

describe('DialogueCancelComponent', () => {
  let component: DialogueCancelComponent;
  let fixture: ComponentFixture<DialogueCancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueCancelComponent]
    });
    fixture = TestBed.createComponent(DialogueCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
