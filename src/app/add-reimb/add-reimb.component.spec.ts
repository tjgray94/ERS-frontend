import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReimbComponent } from './add-reimb.component';

describe('AddReimbComponent', () => {
  let component: AddReimbComponent;
  let fixture: ComponentFixture<AddReimbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReimbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReimbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
