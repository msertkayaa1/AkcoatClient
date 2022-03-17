import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datemonth'
})
export class DatemonthPipe implements PipeTransform {

  transform(date: any, args?: any): any {
    return moment(date).format('DD.MM');
  }
}
