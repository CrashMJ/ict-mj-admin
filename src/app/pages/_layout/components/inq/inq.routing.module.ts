import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InqManagementComponent } from "src/app/pages/_layout/components/inq/inq.component";
import { EditInqComponent } from "src/app/pages/_layout/components/inq/edit/edit.component";
import { GetAllTipResolver } from "./resolvers/getAllTips.resolver";

const routes: Routes = [
  {
    path: "",
    component: InqManagementComponent,
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
export class FaqManagementRoutingModule {}
