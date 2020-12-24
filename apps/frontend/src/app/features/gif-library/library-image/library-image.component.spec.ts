import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryImageComponent } from './library-image.component';

describe('LibraryImageComponent', () => {
  let component: LibraryImageComponent;
  let fixture: ComponentFixture<LibraryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
