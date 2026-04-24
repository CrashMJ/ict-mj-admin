import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LessonPurchaseRoutingModule } from "./lesson-purchase-routing.module";
import { EditLessonPurchaseComponent } from "./edit-lessons-purchase/edit-lesson-purchase.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { LessonPurchaseModelComponent } from "./lessons-purchase/lessons-purchase-model.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [LessonPurchaseModelComponent, EditLessonPurchaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LessonPurchaseRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class lessonPurchaseModule {}
