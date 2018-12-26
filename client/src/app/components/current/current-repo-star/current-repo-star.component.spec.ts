import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoStarComponent } from './current-repo-star.component';

describe('CurrentRepoStarComponent', () => {
  let component: CurrentRepoStarComponent;
  let fixture: ComponentFixture<CurrentRepoStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoStarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
