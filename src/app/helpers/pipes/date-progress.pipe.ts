import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateProgress'
})
export class DateProgressPipe implements PipeTransform {

  transform(startDate: any, endDate: any,): number {

   
    let mStartDate = moment.utc(startDate).local();
    let mEndDate = moment.utc(endDate).local();
    let currentDate = moment();


    let range = mEndDate.diff(mStartDate, 'seconds');
    let progress = mEndDate.diff(currentDate, 'seconds');

  
    if (range < 0 || progress < 0)
      return 0
    else 
     return (((range - progress) / (range)) * 100);
    
    



  }

}
