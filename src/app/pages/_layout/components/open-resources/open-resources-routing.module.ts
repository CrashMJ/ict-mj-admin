import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { OpenResourceComponent } from "./open-resources.component";
import { EditPaymentComponent } from "./edit-payment/edit-payment.component";

const routes: Routes = [
  {
    path: "",
    component: OpenResourceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrRoutingModule {}
