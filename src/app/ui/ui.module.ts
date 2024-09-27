import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


// Components
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './admin/transaction.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from "../app-material.module";

// Routing
import { UiRoute} from "./ui.routes";
import { RouterModule} from "@angular/router";

// Services
import { ContractService } from "../services/contract/contract.service";
import { ThreeBox } from "../services/3box.service";
import { AddressPipe } from '../address.pipe';
import { FromWeiPipe } from '../from-wei.pipe'
import {OrderModule} from "ngx-order-pipe";
import { FooterComponent } from './footer/footer.component';
import { SpacexComponent } from './spacex/spacex.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    TransactionComponent,
    ErrorComponent,
    AddressPipe,
    FromWeiPipe,
    FooterComponent,
    SpacexComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UiRoute),
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule,

  ],
  exports: [
    HomeComponent
  ],
  providers: [
    ContractService,
    ThreeBox
  ],
})
export class UiModule { }
