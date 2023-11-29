import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueViewComponent } from './dialogue-view.component';

describe('DialogueViewComponent', () => {
  let component: DialogueViewComponent;
  let fixture: ComponentFixture<DialogueViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueViewComponent]
    });
    fixture = TestBed.createComponent(DialogueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
