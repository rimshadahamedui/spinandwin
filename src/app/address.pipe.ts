import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const compressed = value.slice(0, 6) + '...' + value.slice(value.length - 4 , value.length);
    return compressed;
  }

}
