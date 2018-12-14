import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRepoLicenseComponent } from './current-repo-license.component';

describe('CurrentRepoLicenseComponent', () => {
  let component: CurrentRepoLicenseComponent;
  let fixture: ComponentFixture<CurrentRepoLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRepoLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRepoLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
