import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityDialogueViewComponent } from './maternity-dialogue-view.component';

describe('MaternityDialogueViewComponent', () => {
  let component: MaternityDialogueViewComponent;
  let fixture: ComponentFixture<MaternityDialogueViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityDialogueViewComponent]
    });
    fixture = TestBed.createComponent(MaternityDialogueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
