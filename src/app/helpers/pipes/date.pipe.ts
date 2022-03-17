import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: any, format = 'DD.MM.YYYY'): string {
 
    let d = new Date(moment.utc(date).local().format())
    return moment(d).format(format)
  }


}
