import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { InqService } from "./services/inq.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { InqModelComponent } from "./model/model.component";
import { InqModel2Component } from "./model2/model.component";

@Component({
  selector: "app-assignment-management",
  templateUrl: "./assignment-management.component.html",
  styleUrls: ["./assignment-management.component.scss"],
})
export class AssignManagementComponent implements OnInit {
  tipObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "course_en_name",
    "module_en_name",
    "question_title",
    "is_rated",
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
    private inqService: InqService,
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
      this.pagination_data.pageIndex * this.pagination_data.limit
    );
  }

  clearFilter() {
    this.searchArray = [];
    this.getData([], this.pagination_data.limit, 0);
  }

  getData(filter: any, limit: number, skip: number) {
    this.inqService.getAllTips(filter, limit, skip).subscribe(
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
    const modalRef = this.modalService.open(InqModelComponent, { size: "lg" });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.getData([], this.pagination_data.limit, 0),
      () => {}
    );
    // this.edit(1);
  }

  uploadCSV(){
    const modalRef = this.modalService.open(InqModel2Component, { size: "lg" });
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
    modalRef.componentInstance.type = "Assignment";
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
