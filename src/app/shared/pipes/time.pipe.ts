import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'converttime'})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const format = 'h:mm a';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

}
