import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReviewsManagementRoutingModule } from "./reviews-management-routing.module";
import { EditReviewsComponent } from "./edit-reviews/edit-reviews.component";
import { ReviewsModelComponent } from "./reviews-model/reviews-model.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
  declarations: [EditReviewsComponent, ReviewsModelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReviewsManagementRoutingModule,
    InlineSVGModule,
  ],
})
export class ReviewsManagementModule {}
