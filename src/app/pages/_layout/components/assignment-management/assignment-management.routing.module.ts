import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssignManagementComponent } from "src/app/pages/_layout/components/assignment-management/assignment-management.component";
import { EditInqComponent } from "src/app/pages/_layout/components/assignment-management/edit/edit.component";
import { GetAllTipResolver } from "./resolvers/getAllTips.resolver";

const routes: Routes = [
  {
    path: "",
    component: AssignManagementComponent,
  },
  {
    path: "edit/:id",
    component: EditInqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRoutingModule {}
