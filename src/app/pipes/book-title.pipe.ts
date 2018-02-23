import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookTitle'
})
export class BookTitlePipe implements PipeTransform {

  /**
   *  Tranfroms given sentance to capitalize form 
   * and english only.
   * @param value ;
   */
  transform(value: any): any {
    if (value) {
    return value.replace(/\b\w/g, first => first.toLocaleUpperCase()).replace(/[^A-Za-z0-9 .]/g, '');
    } else {
  return '';
    }
  }

}
