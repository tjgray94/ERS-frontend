import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbListComponent } from './reimb-list.component';

describe('ReimbListComponent', () => {
  let component: ReimbListComponent;
  let fixture: ComponentFixture<ReimbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
