import { Pipe, PipeTransform } from '@angular/core';
import { sortBy } from 'lodash';

@Pipe({
  name: 'librarySort',
})
export class LibrarySortPipe implements PipeTransform {
  transform(library: any, args?: string): any {
    const categories = Object.entries(library)
      .map((entry) => entry[0])
      .sort();

    if (!args) {
      return categories.sort();
    } else {
      switch (args) {
        case 'reverse':
          return categories.reverse();

        case 'date':
          return sortBy(library, 'searchDate')
            .map((value) => Object.keys(library).find((key) => library[key] === value))
            .reverse();

        default:
          return categories;
      }
    }
  }
}
