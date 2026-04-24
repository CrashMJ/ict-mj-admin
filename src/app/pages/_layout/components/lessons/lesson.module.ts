import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LessonRoutingModule } from "./lesson-routing.module";
import { EditLessonComponent } from "./edit-lesson/edit-lesson.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { LessonModelComponent } from "./lesson/lesson-model.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [LessonModelComponent, EditLessonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LessonRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class lessonModule {}
