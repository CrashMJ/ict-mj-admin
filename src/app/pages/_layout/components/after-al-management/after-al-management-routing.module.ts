import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesManagementComponent } from './categories-management/categories-management.component';
import { InstituteManagementComponent } from './institute-management/institute-management.component';
import { EditInstituteComponent } from './institute-management/edit-institute/edit-institute.component';
import { EditCategoryComponent } from './categories-management/edit-category/edit-category.component';
import { OptionManagementComponent } from './option-management/option-management.component';
import { EditOptionComponent } from './option-management/edit-option/edit-option.component';
import { CampusContactUsManagementComponent } from './campus-contact-us-management/campus-contact-us-management.component';
import { EditCampusContactComponent } from './campus-contact-us-management/edit-campus-contact/edit-campus-contact.component';

const routes: Routes = [
  
  {
    path: 'category',
    component: CategoriesManagementComponent,
   

  },
  {
    path: 'category/:id',
    component: EditCategoryComponent,

  },
  {
    path: 'institute',
    component: InstituteManagementComponent,

  },
  {
    path: 'institute/:id',
    component: EditInstituteComponent,

  },
  {
    path: 'option',
    component: OptionManagementComponent,

  },
  {
    path: 'option/:id',
    component: EditOptionComponent,

  },
  {
    path: 'campus',
    component: CampusContactUsManagementComponent,

  },
  {
    path: 'campus/:id',
    component: EditCampusContactComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfterALManagementRoutingModule { }
