import {Inject, Injectable} from '@angular/core';
import { WEB3 } from '../../core/web3';
//import contract from 'truffle-contract'; //acceso a libreria deprecada
import { MatSnackBar } from '@angular/material/snack-bar';
import {BehaviorSubject, Subject} from 'rxjs';

import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {HttpClient} from "@angular/common/http";

declare let require: any;
const ERC20Contract = require('contracts/ERC20.json');
const PLAYContract = require('contracts/PLAY.json');
declare let window: any;

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  web3Modal;
  web3js;
  provider;
  accounts;
  balance;
  ERC20ContractCTX;
  PLAYContractCTX;
  entryPrice = new BehaviorSubject('');
  contractStatus = new BehaviorSubject('');
  currentAccount = new BehaviorSubject('');
  NetworkStatus = new BehaviorSubject(false);
  WalletProvidersInfo = new BehaviorSubject([]);
  NetworkID = 97;

  BASE_URL = 'https://playgateway.bytrade.io/'

  //POL
  /* TESTNETID 80001*/
  /* MAINNET 137*/

  //BSC
  /* TESTNETID 97*/
  /* MAINNET 137*/



  constructor(@Inject(WEB3) private web3: Web3 ,private snackbar: MatSnackBar , private http: HttpClient) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
      }
    };
    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: "dark"
    });
    if (this.web3Modal){
      this.WalletProvidersInfo.next(this.web3Modal.userOptions);
    }

    web3.eth.getChainId((err , data) => {
      if (data === this.NetworkID){
        this.NetworkStatus.next(true);
      }  else {
        this.NetworkStatus.next(false);
      }
    });

    let contract = require("@truffle/contract");
    this.ERC20ContractCTX = contract(ERC20Contract);
    this.PLAYContractCTX = contract(PLAYContract);

// @ts-ignore
   /* const c_address = ERC20Contract.networks['137'].address;
    this.contractAddress.next(c_address);*/
  }


  async connectAccount() {
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.ERC20ContractCTX.setProvider(this.provider);
    this.PLAYContractCTX.setProvider(this.provider);
    return this.accounts;
  }





  async showContracts(){
    await this.ERC20ContractCTX.deployed().then((instance) => {
      console.log('CONTRACT-ERC20' , instance);
    });
    await this.PLAYContractCTX.deployed().then((instance) => {
      console.log('CONTRACT-PLAY' , instance);
    });
  }

}
