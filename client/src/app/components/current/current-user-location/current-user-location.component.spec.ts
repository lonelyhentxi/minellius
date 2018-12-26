import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserLocationComponent } from './current-user-location.component';

describe('CurrentUserLocationComponent', () => {
  let component: CurrentUserLocationComponent;
  let fixture: ComponentFixture<CurrentUserLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
