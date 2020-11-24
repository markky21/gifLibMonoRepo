import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNaviComponent } from './mobile-navi.component';

describe('MobileNaviComponent', () => {
  let component: MobileNaviComponent;
  let fixture: ComponentFixture<MobileNaviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNaviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
