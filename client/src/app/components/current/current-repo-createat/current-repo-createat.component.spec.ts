import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoCreateatComponent } from './current-repo-createat.component';

describe('CurrentRepoCreateatComponent', () => {
  let component: CurrentRepoCreateatComponent;
  let fixture: ComponentFixture<CurrentRepoCreateatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoCreateatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoCreateatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
