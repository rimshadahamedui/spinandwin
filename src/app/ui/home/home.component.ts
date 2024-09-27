import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ContractService} from "../../services/contract/contract.service";
import {Subscription} from "rxjs";
import Web3 from 'web3';
import {WEB3} from "../../core/web3";
import {Contract20Service} from "../../contract/contract20.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
  @Input() networkStatus = '';
  connectedAccount;
  coin = 'MATIC';
  WalletProviders;
  entryprice;
  balance;
  Collection;
  AssetLenght;
  TotalSupply;
  UserFund;
  SelectedMainTab = 'collectible';
  NetworkStatus;
  BlockExplorer = 'https://polygonscan.com/address/';
  menu = false;
  MintData = {
    name:'Ticket',
    description: 'Ticket Description',
    nft_amount : 1,
    reward: 0,
    attributes: {
    }
  }

  playLoader = false;
  jackpotPrice: any = 0;
  approval = true;
  ref = '0x0000000000000000000000000000000000000000';
  playable_balance;
  user_balance;

  constructor(public contract: ContractService , public contract20 : Contract20Service , private route: ActivatedRoute) {

    this.contract.WalletProvidersInfo.subscribe(res => {this.WalletProviders = res;});
    this.contract.NetworkStatus.subscribe(res => {this.NetworkStatus = res;});
    this.contract.currentAccount.subscribe(res =>{this.connectedAccount = res[0]});


    this.contract20.playLoader.subscribe(res => this.playLoader = res);
    this.contract20.jackpotPrice.subscribe(res => this.jackpotPrice = res);
    this.contract20.entryPrice.subscribe(res => this.entryprice = Number(res));


    this.route.queryParams.subscribe(params => {
      if (params.ref){
        this.ref = params.ref;
      }else {
        this.ref = '0x86E9dd55ad9b14410B2C24BFc33724365FbDAA6b';
      }
    });



  }

  async ngOnInit() {




    this.contract.connectAccount().then(async (value: any) => {
      this.connectedAccount = value[0];
      this.syncData(this.connectedAccount).then();
    }).catch((error: any) => {
    });


    this.contract20.getBalance().subscribe()



  }

  ngOnDestroy(): void {

  }
  connectAccount() {
    this.contract.connectAccount().then((value: any) => {
      this.connectedAccount = value[0];
        this.syncData(this.connectedAccount).then();
      })
      .catch((error: any) => {
      });
  }


  async syncData(x) {
    this.contract20.getJackpotPrice().then();
    this.contract20.getEntryPrice().then();
    this.getBalance(x);
    this.getPlayableBalance(x);
  }





  ClaimReward(){

  }


  changeMainTab(val) {
    this.SelectedMainTab = val;
  }

  addNetwork() {
 /*   const params = [{
      chainId: '0x38',
      chainName: 'Binance Smart Chain',
      nativeCurrency: {
        name: 'BSC Mainnet',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com']
    }];
    window.ethereum.request({ method: 'wallet_addEthereumChain', params })
      .then(() => {
        console.log('Network Added');
        window.location.reload();
      })
      .catch((error) => console.log("Error", error.message));*/



    const params = [{
     chainId: '0x61',
     chainName: 'BNB Chain Testnet',
     nativeCurrency: {
       name: 'BNB',
       symbol: 'BNB',
       decimals: 18
     },
     rpcUrls: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'],
     blockExplorerUrls: ['https://testnet.bscscan.com']
   }];
   window.ethereum.request({ method: 'wallet_addEthereumChain', params })
     .then(() => {
       console.log('Network Added');
       window.location.reload();
     })
     .catch((error) => console.log("Error", error.message));





  }

  MenuOpen(){
    if (this.menu === true){
      this.menu = false;
    } else {
      this.menu = true;
    }
  }

  SpinAndWin() {
    if (this.entryprice <= this.playable_balance){
      this.contract20.play(this.connectedAccount , this.entryprice, this.MintData , this.ref).then(res => {
        this.syncData(this.connectedAccount);
      });
    } else {
      console.log('SP')
    }

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


  testCalls(){
    this.contract20.getPastEvents(this.connectedAccount).then();
  }
}
