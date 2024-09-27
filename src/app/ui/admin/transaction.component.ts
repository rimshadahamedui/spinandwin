import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContractService } from "src/app/services/contract/contract.service";
import {__await} from "tslib";
import {Subscriber, Subscription} from "rxjs";
import Web3 from "web3";
import {WEB3} from "../../core/web3";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit , OnDestroy {
  coin = 'MATIC';
  address: string;
  amount: number;
  connectedAccount: any;
  balance: string;
  transactionForm: FormGroup;
  mintForm: FormGroup;
  totalSupply: any = 0;
  contractAddress;
  whiteListAddress;
  blackListAddress;
  selectedMainTab = 'Dashboard';
  newEntryPrice;
  EntryPrice;
  CurrentContractStatus;
  ContractStatus;
  AssetLength;
  ABBalance;
  ValidUser = 'false';
  TotalSupply;
  Collection;

  BlockExplorer = 'https://polygonscan.com/address/';


  CollectionSubscibe: Subscription;

  MintData = {
    name:'Ticket',
    description: 'Ticket Description',
    nft_amount : 2,
    reward: 0,
    attributes: {

    }
  }

  loader = false;


  constructor(private fb: FormBuilder, private contract: ContractService , @Inject(WEB3) private web3: Web3) {
    this.transactionForm = new FormGroup({
        sendaddress: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required]),
      });
    this.mintForm = new FormGroup({
        mintAmount: new FormControl("", [Validators.required]),
        reward: new FormControl("", [Validators.required]),
      },
    );
    if (localStorage.getItem('main')){
      this.selectedMainTab = localStorage.getItem('main');
    } else {
      this.selectedMainTab = 'dashboard';
    }
  }

  async ngOnInit() {
    await this.contract.connectAccount().then((value: any) => {
      this.connectedAccount = value;
    }).catch((error: any) => {
        console.log(error);
    });
  }
  ngOnDestroy() {
    this.CollectionSubscibe.unsubscribe();
  }
  async loadCollectionAdmin() {
  }
  switchMainTab(val){
    this.selectedMainTab = val;
    localStorage.setItem('main' , val);
  }

  loadPinsFromPinata(){

  }


  connectAccount() {
    this.contract
      .connectAccount()
      .then((value: any) => {
        console.log(value);
        this.connectedAccount = value;
        this.getDetails(this.connectedAccount);
      })
      .catch((error: any) => {
      });
  }
  getDetails(account) {
/*    this.contract
      .accountInfo(account)
      .then((value: any) => {
        this.balance = value;

      })
      .catch((error: any) => {
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });*/
  }



  mintAll(){
  /*  this.loader = true;
      this.contract.uploadToIPFS(this.MintData).subscribe( async (res:any) => {
      let MintedHashes = [];
      let ApplyRewards = [];
      let Reward = this.MintData.reward;
      for await (let x of res){
        MintedHashes.push(x.IpfsHash);
        ApplyRewards.push(Reward)
      }
      await this.contract.mintAll(this.MintData.nft_amount , ApplyRewards , MintedHashes , this.connectedAccount);
      this.loader = false;
    } , () => {
      this.loader = false;
    })*/
  }






}
