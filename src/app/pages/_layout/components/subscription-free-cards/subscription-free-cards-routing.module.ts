import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionFreeCardComponent } from './subscription-free-cards.component';
import { EditComponent } from './edit-subscription-free-cards/edit.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionFreeCardComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsFreeCardRoutingModule { }
