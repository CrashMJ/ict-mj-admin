import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/tip-info-model/tip-info-model.component';
import { ActivatedRoute } from "@angular/router";
import { VodEnrollService } from "./services/vod-enroll.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Debounce } from "lodash-decorators";

@Component({
  selector: "app-vod-enrollments",
  templateUrl: "./vod-enrollments.component.html",
  styleUrls: ["./vod-enrollments.component.scss"],
})
export class VodEnrollComponent implements OnInit {
  vodEnrollObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "course_id",
    "name_en",
    "student_id",
    "student",
    "last_payment_date",
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
    private vodEnrollService: VodEnrollService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData([], this.pagination_data.limit, 0);
  }

  @Debounce(1000)
  search(key: string, value: any) {
    this.searchArray[key] = value;
    this.getData(
      this.searchArray,
      this.pagination_data.limit,
      this.pagination_data.pageIndex
    );
  }

  clearFilter() {
    this.searchArray = [];
    this.getData([], this.pagination_data.limit, 0);
  }

  getData(filter: any, limit: number, skip: number) {
    setTimeout(()=>{},1000)
    this.vodEnrollService.getVodEnroll(filter, limit, skip).subscribe(
      (list: any) => {
        this.vodEnrollObj = list.data.results;
        this.pagination_data.total = list.data.pagination.total;
        this.dataSource = this.vodEnrollObj;

        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  delete(id: any, name: string) {
    console.log("delete");
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "VOD Enrollment";
    modalRef.componentInstance.value = name + "'s ";
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
