import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [],
})
export class LoadingIndicatorComponent implements OnInit {
  public progress$;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.progress$ = this.mainService.progress;
  }
}
