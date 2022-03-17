import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idGenerate'
})
export class IdGeneratePipe implements PipeTransform {

  transform(value: string): unknown {
    return  value.replace(" ","");
  }

}
