import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FaqManagementComponent } from "src/app/pages/_layout/components/tip-info-management/faq-management.component";
import { EditFaqComponent } from "src/app/pages/_layout/components/tip-info-management/edit-faq/edit-faq.component";
import { GetAllTipResolver } from "./resolvers/getAllTips.resolver";

const routes: Routes = [
  {
    path: "",
    component: FaqManagementComponent,
    resolve: {
      tipDetails: GetAllTipResolver,
    },
  },
  {
    path: "edit/:id",
    component: EditFaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqManagementRoutingModule {}
