import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/tip-info-model/tip-info-model.component';
import { ActivatedRoute } from "@angular/router";
import { LessonService } from "./services/lesson.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { LessonModelComponent } from "./lesson/lesson-model.component";
import { Debounce } from "lodash-decorators";

@Component({
  selector: "app-lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.scss"],
})
export class LessonComponent implements OnInit {
  lessonObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "name",
    "grade",
    "grade_type",
    "type",
    "duration",
    "discounted_price",
    "price",
    "status",
    "action",
  ];
  dataSource: any;
    pagination_item_counts = environment.pagination_item_counts;
    pagination_data = environment.pagination_data;
  
    searchArray: any = [];
  
    constructor(
      private modalService: NgbModal,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private toastr: ToastrService,
      private lessonService: LessonService
    ) {
      this.getData(10, 0);
    }
  
    ngOnInit(): void {}
  
    search(key: string, value: any) {
      console.log('Enter search',this.pagination_data.limit, this.pagination_data.pageIndex )
      this.searchArray[key] = value;
      this.getData(
        this.pagination_data.limit,
        this.pagination_data.pageIndex
      );
    }
  
    clearFilter() {
      this.searchArray = [];
      this.getData(this.pagination_data.limit, 0);
    }
  
    getData(limit: number, skip: number) {
      console.log('limit', limit)
      console.log('skip', skip)
      this.lessonService.getAllLessons(this.searchArray, limit, skip).subscribe(
        (lessonList: any) => {
          this.lessonObj = lessonList.data.results;
          this.pagination_data.total = lessonList.data.pagination.total;
          this.dataSource = this.lessonObj;
  
          this.cdr.markForCheck();
        },
        (error) => {
          // this.toastr.warning("Something went wrong.", "Error!");
          console.log(error); // The error is here
        }
      );
    }
  
    addLesson() {
      const modalRef = this.modalService.open(LessonModelComponent, {
        size: "lg",
      });
      // modalRef.componentInstance.id = id;
      modalRef.result.then(
        () => this.getData(this.pagination_data.limit, 0),
        () => {}
      );
      // this.edit(1);
    }
  
    delete(id: any, name: string) {
      const modalRef = this.modalService.open(DeleteModelComponent, {
        size: "lg",
      });
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.type = "Lesson";
      modalRef.componentInstance.value = name;
  
      modalRef.result.then(
        () =>
          this.getData(
            this.pagination_data.limit,
            this.pagination_data.pageIndex
          ),
        () => {}
      );
    }
    pageEvent(event: any) {
      this.pagination_data.limit = event.pageSize;
      this.pagination_data.pageIndex = event.pageIndex;
      const skip = event.pageIndex ;
      this.getData(event.pageSize, skip);
    }
  }