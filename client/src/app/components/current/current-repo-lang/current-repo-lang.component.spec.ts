import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoLangComponent } from './current-repo-lang.component';

describe('CurrentRepoLangComponent', () => {
  let component: CurrentRepoLangComponent;
  let fixture: ComponentFixture<CurrentRepoLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
