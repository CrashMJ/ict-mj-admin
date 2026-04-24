import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/tip-info-model/tip-info-model.component';
import { ActivatedRoute } from "@angular/router";
import { LessonPurchaseService } from "./services/lesson-purchase.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Debounce } from "lodash-decorators";
import { LessonPurchaseModelComponent } from "./lessons-purchase/lessons-purchase-model.component";

@Component({
  selector: "app-lesson-purchase",
  templateUrl: "./lesson-purchase.component.html",
  styleUrls: ["./lesson-purchase.component.scss"],
})
export class LessonPurchaseComponent implements OnInit {
  lessonPurchaseObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "videoName",
    "studentName",
    "days",
    "start_date",
    "end_date",
    "payment_type",
    "total_price",
    "status",
    "payment_status",
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
      private lessonPurchaseService: LessonPurchaseService
    ) {
      this.getData(10, 0);
    }
  
    ngOnInit(): void {}
  
    search(key: string, value: any) {
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
      console.log('limit',limit)
      console.log('skip',skip) 

      this.lessonPurchaseService.getAllLessonsPurchase(this.searchArray, limit, skip).subscribe(
        (lessonPurchaseList: any) => {
          console.log('lessonPurchaseList',lessonPurchaseList)
          this.lessonPurchaseObj = lessonPurchaseList.data.results;
          this.pagination_data.total = lessonPurchaseList.data.pagination.total;
          this.dataSource = this.lessonPurchaseObj;
  
          this.cdr.markForCheck();
        },
        (error) => {
          // this.toastr.warning("Something went wrong.", "Error!");
          console.log(error); // The error is here
        }
      );
    }

    addPayment() {
        const modalRef = this.modalService.open(LessonPurchaseModelComponent, {
          size: "lg",
        });
        // modalRef.componentInstance.id = id;
        modalRef.result.then(
          () => this.getData(this.pagination_data.limit, 0),
          () => {}
        );
      }
  
    delete(id: any, name: string) {
      console.log("delete");
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
      this.getData(event.pageSize, event.pageIndex);
    }
  }