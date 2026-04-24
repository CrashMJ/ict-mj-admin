import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonComponent } from './lesson.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: LessonComponent,
  },
  {
    path: 'edit/:id',
    component: EditLessonComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
