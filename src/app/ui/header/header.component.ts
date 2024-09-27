import { Component, OnInit } from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import {Contract20Service} from "../../contract/contract20.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = false;
  connectedAccount:  any = '';
  playable_balance: any;
  user_balance: any = null;
  deposit_amount;
  withdraw_amount;
  constructor(public api: ContractService , public contract20: Contract20Service) {

  }

  ngOnInit(): void {
    this.api.connectAccount().then(res => {
      this.connectedAccount = res[0];
      this.getBalance(this.connectedAccount);
      this.getPlayableBalance(this.connectedAccount)
    })
  }

  getBalance(x){
    this.contract20.getUsersBalance(x).then( async res => {
      this.user_balance = Number(res);
    })
  }

  getPlayableBalance(x){
    this.contract20.getPlayableBalance(x).then( async res => {
      this.playable_balance = Number(res);
    })
  }
  MenuOpen(){
    if (this.menu === true){
      this.menu = false;
    } else {
      this.menu = true;
    }
  }


  deposit(){
    this.contract20.deposite(this.connectedAccount , this.deposit_amount).then(res => {
      this.getPlayableBalance(this.connectedAccount);
    })
  }

  withdraw(){
    this.contract20.withdraw(this.connectedAccount , this.withdraw_amount).then(res => {
      this.getPlayableBalance(this.connectedAccount);
    })
  }

  copyCode(x){
    navigator.clipboard.writeText(x).then().catch(e => console.log(e));
  }

}
