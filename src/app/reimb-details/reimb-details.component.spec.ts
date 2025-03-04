import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbDetailsComponent } from './reimb-details.component';

describe('ReimbDetailsComponent', () => {
  let component: ReimbDetailsComponent;
  let fixture: ComponentFixture<ReimbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
