import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserRepoComponent } from './current-user-repo.component';

describe('CurrentUserRepoComponent', () => {
  let component: CurrentUserRepoComponent;
  let fixture: ComponentFixture<CurrentUserRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
