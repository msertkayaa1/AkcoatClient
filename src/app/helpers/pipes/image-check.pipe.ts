import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageCheck'
})
export class ImageCheckPipe implements PipeTransform {

  transform(value: string): string {
    if(!value)
      return 'https://res.cloudinary.com/mypulsepro/image/upload/v1630280316/icons8-no-image-100_qvxkbh.png';
    
    return value;
  }

}
