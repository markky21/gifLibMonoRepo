import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-edit-gif',
  templateUrl: './edit-gif.component.html',
  styleUrls: ['./edit-gif.component.scss'],
})
export class EditGifComponent implements OnInit, AfterViewInit, AfterContentChecked {
  data$: Observable<number[]>;
  classes: string[];
  time;

  getData(): Observable<number[]> {
    return of(Array.from(new Array(10000).keys()));
  }

  ngOnInit(): void {
    console.time(this.time);
    // 10000
    // ngClass - 510.333984375ms
    // class - 335.656982421875ms
    // class {{ }} - 354.572021484375ms

    // 90000
    // ngClass - 5564.77783203125ms
    // class - 3984.966064453125ms
    // class {{ }} 4082.988037109375ms

    // 1mln
    // ngClass -
    // class - 380088.408203125ms
    // class {{}} - 355894.7189941406ms
    this.assignClasses();
    this.data$ = this.getData();
  }

  assignClasses(): void {
    this.getData().subscribe((data) => {
      this.classes = data.map((number) => {
        if (number % 3) {
          return 'red';
        } else {
          return 'gray';
        }
      });
    });
  }

  ngAfterViewInit(): void {
    console.timeEnd(this.time);
  }

  ngAfterContentChecked(): void {}
}
