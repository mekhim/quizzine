import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pl'
})
export class PluralPipe implements PipeTransform {

  transform(value: any, arg:boolean): string {
    return value + (arg ? "s":"");
  }

}
