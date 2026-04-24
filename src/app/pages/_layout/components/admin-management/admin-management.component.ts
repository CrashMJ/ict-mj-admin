import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AdminModalComponentComponent } from "src/app/pages/_layout/components/admin-management/admin-modal-component/admin-modal-component.component";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminManagementService } from "./services/admin.service";
import {
  PaginatorState,
  SortState,
  GroupingState,
} from "src/app/_metronic/shared/crud-table";
import { Subscription } from "rxjs";
import { ProductsService } from "src/app/modules/e-commerce/_services";
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-admin-management",
  templateUrl: "./admin-management.component.html",
  styleUrls: ["./admin-management.component.scss"],
})
export class AdminManagementComponent implements OnInit {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "role",
    "created_at",
    "action",
  ];
  dataSource: any;
  pagination_item_counts = environment.pagination_item_counts;
  pagination_data = environment.pagination_data;

  searchArray: any = [];

  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  admin:any;
	accType:any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private adminManagementService: AdminManagementService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.admin = localStorage.getItem('user');
		this.accType = this.admin && JSON.parse(this.admin) && JSON.parse(this.admin).data && JSON.parse(this.admin).data.admin.role ? JSON.parse(this.admin).data.admin.role :  '';
  }

  displayedColumns8: string[] = [
    "id",
    "name",
    "email",
    "phone",
    "created_at",
    "action",
  ];
  dataSource8;
  isLoadingResults = true;
  isRateLimitReached = false;
  count = 60;
  temp: any;
  adminList: any[] = [];
  adminObj: any;
  elements: any = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry", last: "the Bird", handle: "@twitter" },
  ];
  // constructor(private modalService: NgbModal,private adminManagementService: AdminManagementService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData("", this.pagination_data.limit, 0);

    // this.getAdminList();

    // const sb = this.productsService.isLoading$.subscribe(res => this.isLoading = res);
    console.log(this.isLoading);
    // this.subscriptions.push(sb);
    this.grouping = this.productsService.grouping;
    this.paginator = this.productsService.paginator;
    this.sorting = this.productsService.sorting;
    this.productsService.fetch();
  }

  search(key: string, value: any) {
    this.searchArray = value;
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
    this.adminManagementService.getAdminList(filter, limit, skip).subscribe(
      (list: any) => {
        this.adminObj = list.data.results;
        this.pagination_data.total = list.data.pagination.total;
        this.dataSource = this.adminObj;

        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  addNewAdmin() {
    const modalRef = this.modalService.open(AdminModalComponentComponent, {
      size: "lg",
    });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.getData("", this.pagination_data.limit, 0),
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
    modalRef.componentInstance.type = "Admin";
    modalRef.componentInstance.value = name;
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
  }
}
