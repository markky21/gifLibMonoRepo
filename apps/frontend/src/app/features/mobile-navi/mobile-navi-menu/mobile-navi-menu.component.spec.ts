import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNaviMenuComponent } from './mobile-navi-menu.component';

describe('MobileNaviMenuComponent', () => {
  let component: MobileNaviMenuComponent;
  let fixture: ComponentFixture<MobileNaviMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNaviMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNaviMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
