import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditReviewsComponent } from "./edit-reviews/edit-reviews.component";
import { GetAllReviewResolver } from "./resolvers/getAllTips.resolver";
import { ReviewsManagementComponent } from "./reviews-management.component";

const routes: Routes = [
  {
    path: "",
    component: ReviewsManagementComponent,
  },
  {
    path: "edit/:id",
    component: EditReviewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsManagementRoutingModule {}
