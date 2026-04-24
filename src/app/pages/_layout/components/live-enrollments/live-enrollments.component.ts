import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/tip-info-model/tip-info-model.component';
import { ActivatedRoute } from "@angular/router";
import { LiveEnrollService } from "./services/live-enroll.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-live-enrollments",
  templateUrl: "./live-enrollments.component.html",
  styleUrls: ["./live-enrollments.component.scss"],
})
export class LiveEnrollComponent implements OnInit {
  vodEnrollObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "live_class_id",
    "live_class",
    "type",
    "student_id",
    "name",
    "phone",
    "live_teacher",
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
    private liveEnrollService: LiveEnrollService,
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
    this.liveEnrollService.getVodEnroll(filter, limit, skip).subscribe(
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
    modalRef.componentInstance.type = "Live Enrollment";
    modalRef.componentInstance.value = name + "'s ";
    modalRef.result.then(
      () =>
        this.getData(
          this.searchArray,
          this.pagination_data.limit,
          this.pagination_data.pageIndex * this.pagination_data.limit
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
      event.pageIndex * event.pageSize
    );
  }
}
