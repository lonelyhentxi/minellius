import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDetailComponent } from './current-detail.component';

describe('CurrentDetailComponent', () => {
  let component: CurrentDetailComponent;
  let fixture: ComponentFixture<CurrentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
