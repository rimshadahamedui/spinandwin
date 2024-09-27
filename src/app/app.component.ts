import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContractService} from "./services/contract/contract.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularDapp';
  connectedAccount;
  ValidUser= false;
  Loadafter = false;
  constructor(private contract: ContractService , private route: Router) {
      this.contract.connectAccount().then((value: any) => {
        this.contract.showContracts();
    }).catch((error: any) => {
      console.log('ERRRR' ,error);
    });
  }
  async ngOnInit() {

  }
}
