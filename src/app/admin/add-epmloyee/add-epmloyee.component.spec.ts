import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpmloyeeComponent } from './add-epmloyee.component';

describe('AddEpmloyeeComponent', () => {
  let component: AddEpmloyeeComponent;
  let fixture: ComponentFixture<AddEpmloyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEpmloyeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEpmloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
