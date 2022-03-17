import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'


@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(date: any, args?: any): any {
  

    let d = new Date(moment.utc(date).local().format())
  
    return moment(d).format('HH:mm')

  }

}
