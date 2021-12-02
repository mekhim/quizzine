import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pl'
})
export class PluralPipe implements PipeTransform {

  /**
   *  add "s" if the arg is true, else does nothing
   * @param value
   * @param arg
   */
  transform(value: any, arg:boolean): string {
    return value + (arg ? "s":"");
  }

}
