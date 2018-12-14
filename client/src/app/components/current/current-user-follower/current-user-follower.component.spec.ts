import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserFollowerComponent } from './current-user-follower.component';

describe('CurrentUserFollowerComponent', () => {
  let component: CurrentUserFollowerComponent;
  let fixture: ComponentFixture<CurrentUserFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
