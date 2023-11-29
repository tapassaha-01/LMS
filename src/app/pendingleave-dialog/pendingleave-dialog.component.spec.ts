import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingleaveDialogComponent } from './pendingleave-dialog.component';

describe('PendingleaveDialogComponent', () => {
  let component: PendingleaveDialogComponent;
  let fixture: ComponentFixture<PendingleaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingleaveDialogComponent]
    });
    fixture = TestBed.createComponent(PendingleaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
