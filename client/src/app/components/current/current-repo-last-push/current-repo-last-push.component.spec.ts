import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoLastPushComponent } from './current-repo-last-push.component';

describe('CurrentRepoLastPushComponent', () => {
  let component: CurrentRepoLastPushComponent;
  let fixture: ComponentFixture<CurrentRepoLastPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoLastPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoLastPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
