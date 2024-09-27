import {Inject, Pipe, PipeTransform} from '@angular/core';
import {WEB3} from "./core/web3";
import Web3 from 'web3';
@Pipe({
  name: 'fromWei'
})
export class FromWeiPipe implements PipeTransform {
  constructor(@Inject(WEB3) private web3: Web3) {

  }

  transform(value: unknown, ...args: unknown[]): unknown {
    const converted = this.web3.utils.fromWei(value.toString() , 'ether');
    return converted;
  }

}
