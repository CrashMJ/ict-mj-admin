import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { FaqModelComponent } from "src/app/pages/_layout/components/tip-info-management/faq-model/faq-model.component";
import { ActivatedRoute } from "@angular/router";
import { TipInfoService } from "./services/reviews.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ReviewsModelComponent } from "./reviews-model/reviews-model.component";

@Component({
  selector: "app-reviews-management",
  templateUrl: "./reviews-management.component.html",
  styleUrls: ["./reviews-management.component.scss"],
})
export class ReviewsManagementComponent implements OnInit {
  tipObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "student_name",
    "status",
    "created_at",
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
    private tipInfoService: TipInfoService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData([], this.pagination_data.limit, 0);
  }

  search(key: string, value: any) {
    const found = this.searchArray.find(
      (element) => Object.keys(element)[0] == key
    );
    if (found) {
      this.searchArray.find((element) => Object.keys(element)[0] == key)[key] =
        value;
    } else {
      var obj = {};
      obj[key] = value;
      this.searchArray.push(obj);
    }
    this.getData(
      this.searchArray,
      this.pagination_data.limit,
      this.pagination_data.pageIndex * this.pagination_data.limit
    );
  }

  clearFilter() {
    this.searchArray = [];
    this.getData([], this.pagination_data.limit, 0);
  }

  getData(filter: any, limit: number, skip: number) {
    this.tipInfoService.getAllTips(filter, limit, skip).subscribe(
      (list: any) => {
        this.tipObj = list.data.results;
        this.pagination_data.total = list.data.pagination.total;
        this.dataSource = this.tipObj;

        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  addNewTip() {
    const modalRef = this.modalService.open(ReviewsModelComponent, { size: "lg" });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.getData([], this.pagination_data.limit, 0),
      () => {}
    );
    // this.edit(1);
  }

  delete(id: any, name: string) {
    console.log("delete");
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Review";
    modalRef.componentInstance.value = name;
    modalRef.result.then(
      () =>
        this.getData(
          this.searchArray,
          this.pagination_data.limit,
          this.pagination_data.pageIndex
        ),
      () => {}
    );
  }

  pageEvent(event: any) {
    this.pagination_data.limit = event.pageSize;
    this.pagination_data.pageIndex = event.pageIndex;
    this.getData(
      this.searchArray,
      event.pageSize,
      event.pageIndex
    );
  }
}
