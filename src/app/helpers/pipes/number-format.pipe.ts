import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(count:number): string {
    if (count) {
      if (count > 999) {
        return `${count / 1000}K`;
      }
      else {
        return `${count}`;
      }
    }
    else {
      return "0";
    }
  }

}
