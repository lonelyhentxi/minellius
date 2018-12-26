import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDetailComponent } from './period-detail.component';

describe('PeriodDetailComponent', () => {
  let component: PeriodDetailComponent;
  let fixture: ComponentFixture<PeriodDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
