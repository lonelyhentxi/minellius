import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoForkComponent } from './current-repo-fork.component';

describe('CurrentRepoForkComponent', () => {
  let component: CurrentRepoForkComponent;
  let fixture: ComponentFixture<CurrentRepoForkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoForkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoForkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
