import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { StudentModelComponent } from "src/app/pages/_layout/components/student-management/student-model/student-model.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { StudentService } from "./services/student.service";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { districts } from "src/config/districts.config";
import { Debounce } from 'lodash-decorators';
@Component({
  selector: "app-student-management",
  templateUrl: "./student-management.component.html",
  styleUrls: ["./student-management.component.scss"],
})
export class StudentManagementComponent implements OnInit {
  studentObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "name",
    "nic",
    "phone",
    "created_at",
    "status",
    "is_phone_verified",
    "otp",
    "action",
  ];
  dataSource: any;
  pagination_item_counts = environment.pagination_item_counts;
  pagination_data = environment.pagination_data;

  districts = districts;
  searchArray: any = {};

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData(this.pagination_data.limit, 0);
  }

  @Debounce(1000)
  search(key: string, value: any) {
    this.searchArray[key] = value;
    this.getData(
      this.pagination_data.limit,
      this.pagination_data.pageIndex * this.pagination_data.limit
    );
  }

  clearFilter() {
    this.searchArray = [];
    this.getData(this.pagination_data.limit, 0);
  }

  getData(limit: number, skip: number) {
    this.studentService.getAllStudent(this.searchArray, limit, skip).subscribe(
      (list: any) => {
        this.studentObj = list.data.results;
        this.pagination_data.total = list.data.pagination.total;
        this.dataSource = this.studentObj;

        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  addNewStudent() {
    const modalRef = this.modalService.open(StudentModelComponent, {
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
    console.log("delete");
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Student";
    modalRef.componentInstance.value = name;

    modalRef.result.then(
      () =>
        this.getData(
          this.pagination_data.limit,
          this.pagination_data.pageIndex
        ),
      // this.customerService.fetch(),
      () => {}
    );
  }

  pageEvent(event: any) {
    this.pagination_data.limit = event.pageSize;
    this.pagination_data.pageIndex = event.pageIndex;
    this.getData(event.pageSize, event.pageIndex);
  }
}
