import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserLangComponent } from './current-user-lang.component';

describe('CurrentUserLangComponent', () => {
  let component: CurrentUserLangComponent;
  let fixture: ComponentFixture<CurrentUserLangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserLangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
