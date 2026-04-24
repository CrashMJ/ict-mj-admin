import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
// import { TipInfoModelComponent } from 'src/app/pages/_layout/components/tip-info-management/faq-model/faq-model.component';
import { ActivatedRoute } from "@angular/router";
import { VodSubscriptionService } from "./services/vod-subscription.service";
import { DeleteModelComponent } from "../shared/delete-model/delete-model.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-vod-subscriptions",
  templateUrl: "./vod-subscriptions.component.html",
  styleUrls: ["./vod-subscriptions.component.scss"],
})
export class VodSubscriptionComponent implements OnInit {
  vodSubsObj: any;
  p: number = 1;

  displayedColumns: string[] = [
    "id",
    "name",
    "teachername",
    "payment_method",
    "date",
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
    private vodSubscriptionService: VodSubscriptionService,
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
    this.vodSubscriptionService
      .getVodSubscription(filter, limit, skip)
      .subscribe(
        (list: any) => {
          this.vodSubsObj = list.data.results;
          this.pagination_data.total = list.data.pagination.total;
          this.dataSource = this.vodSubsObj;

          this.cdr.markForCheck();
        },
        (error) => {
          // this.toastr.warning("Something went wrong.", "Error!");
          console.log(error); // The error is here
        }
      );
  }

  addNewTip() {
    // const modalRef = this.modalService.open(TipInfoModelComponent, { size: 'lg' });
    // // modalRef.componentInstance.id = id;
    // modalRef.result.then(() =>
    // this.getData([],this.pagination_data.limit,0),
    //   () => { }
    // );
    // this.edit(1);
  }

  delete(id: any, name: string) {
    console.log("delete");
    const modalRef = this.modalService.open(DeleteModelComponent, {
      size: "lg",
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = "Payment";
    modalRef.componentInstance.value = name + "'s";
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
