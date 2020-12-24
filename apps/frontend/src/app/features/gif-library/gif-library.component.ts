import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

import { MainService } from '../../shared/services/main.service';
import { LibraryType } from './shared/library.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gif-library',
  templateUrl: './gif-library.component.html',
  styleUrls: ['./gif-library.component.scss'],
})
export class GifLibraryComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) allTabs: MatAccordion;

  public library: LibraryType | {} = {};
  public sortOptions = 'date';
  public saveDisabled: boolean;
  public spinnerVisible: boolean;
  public progress = 0;

  private subscriptions = new Subscription();

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.observeUpdates();
    this.spinnerInit();
    this.loadFirebaseData();
    this.saveDisabledSet();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private spinnerInit(): void {
    const spinnerSub = this.mainService.spinner.subscribe((visibility: boolean) => {
      this.spinnerVisible = visibility;
    });

    this.subscriptions.add(
      this.mainService.progress.subscribe((value) => {
        this.progress = value;
      })
    );

    this.subscriptions.add(spinnerSub);
  }

  private loadFirebaseData(): void {
    this.mainService.loadFirebaseData();
  }

  private observeUpdates(): void {
    const updateSub = this.mainService.libraryUpdate.subscribe(() => {
      this.library = this.mainService.getLibrary();
      this.saveDisabled = false;
    });

    this.subscriptions.add(updateSub);
  }

  private saveDisabledSet(): void {
    const saveStateSub = this.mainService.saveState.subscribe((state: boolean) => {
      this.saveDisabled = !state;
    });

    this.subscriptions.add(saveStateSub);
  }

  public saveToFirebase(): void {
    this.mainService.saveLibraryToFirebase();
  }

  public removeCategory(event: MouseEvent, category: string): void {
    event.stopPropagation();
    this.mainService.deleteCategory(category);
  }
}
