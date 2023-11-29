import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternityHistoryComponent } from './maternity-history.component';

describe('MaternityHistoryComponent', () => {
  let component: MaternityHistoryComponent;
  let fixture: ComponentFixture<MaternityHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaternityHistoryComponent]
    });
    fixture = TestBed.createComponent(MaternityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
