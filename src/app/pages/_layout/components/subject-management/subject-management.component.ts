import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { SubjectModelComponent } from "src/app/pages/_layout/components/subject-management/subject-model/subject-model.component";
import { ActivatedRoute } from "@angular/router";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "./services/subject.service";
@Component({
  selector: "app-subject-management",
  templateUrl: "./subject-management.component.html",
  styleUrls: ["./subject-management.component.scss"],
})
export class SubjectManagementComponent implements OnInit {
  subjectObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "name_en",
    "class_grade",
    "class_year",
    "language",
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
    private subjectService: SubjectService
  ) {
    this.getData([], this.pagination_data.limit, 0);
  }

  ngOnInit(): void {}

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
    this.subjectService.getAllSubject(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.subjectObj = teacherList.data.results;
        this.pagination_data.total = teacherList.data.pagination.total;
        this.dataSource = this.subjectObj;

        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  addNewSubject() {
    const modalRef = this.modalService.open(SubjectModelComponent, {
      size: "lg",
    });
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
    modalRef.componentInstance.type = "Course";
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
    this.getData(this.searchArray, event.pageSize, event.pageIndex);
  }
}
