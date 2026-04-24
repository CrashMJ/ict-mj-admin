import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptsComponent } from './receipts.component';
import { GetAllReceiptsResolver } from './resolvers/getAllReceipts.resolver';
import { EditReceiptsComponent } from './edit-receipts/edit-receipts.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiptsComponent,
    resolve: {
      receiptDetails: GetAllReceiptsResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditReceiptsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptsRoutingModule { }
