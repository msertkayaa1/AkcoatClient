import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'field'
})
export class FieldPipe implements PipeTransform {


  transform(value: string, data: Array<any>): any {
   
    let exist = data.find(x => x.value == value);

     return exist?.label;
   
  }

}
