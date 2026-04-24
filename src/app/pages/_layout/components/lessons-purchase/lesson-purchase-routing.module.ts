import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonPurchaseComponent } from './lesson-purchase.component';
import { EditLessonPurchaseComponent } from './edit-lessons-purchase/edit-lesson-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: LessonPurchaseComponent,
  },
  {
    path: 'edit/:id',
    component: EditLessonPurchaseComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonPurchaseRoutingModule { }
