import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/tip-info-model/tip-info-model.component';
import { ActivatedRoute } from "@angular/router";
import { ORService } from "./services/service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { OpenResourceModelComponent } from "./open-resource/model.component";

@Component({
  selector: "app-open-resources",
  templateUrl: "./open-resources.component.html",
  styleUrls: ["./open-resources.component.scss"],
})
export class OpenResourceComponent implements OnInit {
  tipObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "class_type",
    "grade",
    "medium",
    "url",
    "type",
    "title",
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
    private oRService: ORService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData([], this.pagination_data.limit, 0);
  }

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
    this.oRService.getList(filter, limit, skip).subscribe(
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

  addPayment() {
    const modalRef = this.modalService.open(OpenResourceModelComponent, {
      size: "lg",
    });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.getData([], this.pagination_data.limit, 0),
      () => {}
    );
  }

  delete(id: any, name: string) {
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Other Resource";
    modalRef.componentInstance.value = name + "'s";
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
    this.getData(this.searchArray, event.pageSize, event.pageIndex);
  }
}
