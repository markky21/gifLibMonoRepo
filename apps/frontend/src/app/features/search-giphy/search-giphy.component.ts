import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { MainService } from '../../shared/services/main.service';

import { SearchGiphyService } from './service/search-giphy.service';
import { GIFObject } from '../../core/types/gif-object.type';

@Component({
  selector: 'app-search-giphy',
  templateUrl: './search-giphy.component.html',
  styleUrls: ['./search-giphy.component.scss'],
})
export class SearchGiphyComponent implements OnInit, OnDestroy {
  public searchResults;
  public searchControl = new FormControl('', Validators.required);
  public actualTerm = null;

  private searchInput = new Subject<string>();
  private subscriptions = new Subscription();

  constructor(private searchGiphyService: SearchGiphyService, private mainService: MainService) {}

  ngOnInit(): void {
    this.inputSubscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public searchNext(searchTerm: string): void {
    this.searchInput.next(searchTerm);
  }

  public sendToLibrary(category: string, item: GIFObject): void {
    this.mainService.transferToLibrary(category.trim(), item);
    this.searchResults.splice(this.searchResults.indexOf(item), 1);
  }

  public clearTerms(): void {
    this.searchResults = null;
    this.searchControl.reset();
  }

  private search(term: string): void {
    this.subscriptions.add(
      this.searchGiphyService.search(term).subscribe((res) => {
        this.actualTerm = term;
        this.searchResults = res;
      })
    );
  }

  private inputSubscribe(): void {
    this.subscriptions.add(
      this.searchInput
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          filter((searchTerm) => !!searchTerm),
          map((searchTerm: string) => {
            this.search(searchTerm);
          })
        )
        .subscribe()
    );
  }
}
