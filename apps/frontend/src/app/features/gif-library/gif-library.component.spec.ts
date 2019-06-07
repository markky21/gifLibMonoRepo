import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifLibraryComponent } from './gif-library.component';

describe('GifLibraryComponent', () => {
  let component: GifLibraryComponent;
  let fixture: ComponentFixture<GifLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
