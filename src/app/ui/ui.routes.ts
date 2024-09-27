import { Routes } from '@angular/router';

// Components
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import {TransactionComponent} from "./admin/transaction.component";
import {SpacexComponent} from "./spacex/spacex.component";

export const UiRoute: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'main', component: TransactionComponent },
  { path: 'home', component: HomeComponent},
  { path: 'uix', component: SpacexComponent},
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
