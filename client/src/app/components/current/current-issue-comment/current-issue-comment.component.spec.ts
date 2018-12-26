import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentIssueCommentComponent } from './current-issue-comment.component';

describe('CurrentIssueCommentComponent', () => {
  let component: CurrentIssueCommentComponent;
  let fixture: ComponentFixture<CurrentIssueCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentIssueCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentIssueCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
