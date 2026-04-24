import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyQuizComponent } from 'src/app/pages/_layout/components/quiz/weekly-quiz/weekly-quiz.component';
import { EditWeeklyQuizComponent } from 'src/app/pages/_layout/components/quiz/edit-weekly-quiz/edit-weekly-quiz.component';
import { GetAllWeeklyQuizResolver } from './resolvers/getAllWeeklyQuiz.resolver';

const routes: Routes = [
  {
    path: 'weekly',
    component: WeeklyQuizComponent,
    resolve: {
      weeklyQuizObj: GetAllWeeklyQuizResolver
    }

  },
  {
    path: 'weekly/edit/:id',
    component: EditWeeklyQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
