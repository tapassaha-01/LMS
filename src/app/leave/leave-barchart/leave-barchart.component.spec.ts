import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBarchartComponent } from './leave-barchart.component';

describe('LeaveBarchartComponent', () => {
  let component: LeaveBarchartComponent;
  let fixture: ComponentFixture<LeaveBarchartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveBarchartComponent]
    });
    fixture = TestBed.createComponent(LeaveBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
