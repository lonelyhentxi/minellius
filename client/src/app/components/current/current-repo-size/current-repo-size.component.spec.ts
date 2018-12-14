import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoSizeComponent } from './current-repo-size.component';

describe('CurrentRepoSizeComponent', () => {
  let component: CurrentRepoSizeComponent;
  let fixture: ComponentFixture<CurrentRepoSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
