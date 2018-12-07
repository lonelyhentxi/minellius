import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLogoComponent } from './layout-logo.component';

describe('LayoutLogoComponent', () => {
  let component: LayoutLogoComponent;
  let fixture: ComponentFixture<LayoutLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
