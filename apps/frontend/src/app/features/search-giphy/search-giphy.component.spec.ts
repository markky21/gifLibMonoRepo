import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGiphyComponent } from './search-giphy.component';

describe('SearchGiphyComponent', () => {
  let component: SearchGiphyComponent;
  let fixture: ComponentFixture<SearchGiphyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchGiphyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGiphyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
