import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedNotificationComponent } from './copied-notification.component';

describe('CopiedNotificationComponent', () => {
  let component: CopiedNotificationComponent;
  let fixture: ComponentFixture<CopiedNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopiedNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
