import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAreaComponent } from './current-area.component';

describe('CurrentAreaComponent', () => {
  let component: CurrentAreaComponent;
  let fixture: ComponentFixture<CurrentAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
