import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VodSubscriptionService } from "../services/vod-subscription.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-edit-vod-subscriptions",
  templateUrl: "./edit-vod-subscriptions.component.html",
  styleUrls: ["./edit-vod-subscriptions.component.scss"],
})
export class EditVodSubscriptionComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  id: any;
  vodSubscriptionResponse: any;
  paymentMethod:string;
  paymentStatus:string;
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  displayedColumns: string[] = [ 'id','payhere_amount','payment_id','method', 'item_rec_status','item_rec_install_paid','created_at','vod_subcription_id'];

  
  displayedColumnsForSLT: string[] = [ 'id','smart_id','transaction_amount','transaction_date','success','transaction_id','created_at','vod_subcription_id'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  vodSubsObj:any;
  searchArray:any =[];
  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private vodSubscriptionService: VodSubscriptionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      status: ["", Validators.required]
    });

    this.id = this.route.snapshot.params.id;
    this.vodSubscriptionService.getVodSubscriptionById(this.id).subscribe(
      (data: any) => {
        this.vodSubscriptionResponse = data.data;
        this.formGroup.get("status").setValue(this.vodSubscriptionResponse.status);
        this.cdr.markForCheck();
        
        this.paymentMethod = this.vodSubscriptionResponse.payment_method;
        this.paymentStatus= this.vodSubscriptionResponse.status;
        console.log(this.paymentMethod,this.paymentStatus);
      this.getData([],this.pagination_data.limit,0);
      },
      (error) => {
      }
    );

    // if(this.vodSubscriptionResponse){
 
    // } 

  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return "";
    }

    return "active";
  }

  updateService(formData: any) {
    this.submitting = true;
    // this.VodSubscriptionService.editPayment(formData, this.id).subscribe(
    //   (data: any) => {
    //     this.submitting = false;
    //     this.VodSubscriptionResponse = data.data;
    //     this.cdr.markForCheck();
    //     console.log(this.VodSubscriptionResponse);
    //     if (data.statusCode === 200) {
    //       this.toastr.success(data.message, "Success");
    //     } else if (data.statusCode === 400) {
    //       this.toastr.warning(data.message, "Warning");
    //     } else {
    //       this.toastr.warning("Something Went Wrong", "Error!");
    //     }
    //   },
    //   (err) => {
    //     this.submitting = false;
    //     if (err.error && err.error.message)
    //       this.toastr.error(err.error.message, "Error");
    //     else this.toastr.warning("Something Went Wrong", "Error!");
    //   }
    // );
  }

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {
  }

  save() {
    this.updateService(this.formGroup.get("status").value);
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
  }
  
  getData(filter:any,limit: number,skip: number){
    if(this.vodSubscriptionResponse.payment_method === 'SLT_BILL'){
    this.vodSubscriptionService.getSubscriptionSLTPayments([{subscriptionId:this.id }],limit,skip).subscribe((list:any) => {
      this.vodSubsObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.vodSubsObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }
  else{
    this.vodSubscriptionService.getSubscriptionPayherePayments([{vodSubscriptionId:this.id}],limit,skip).subscribe((list:any) => {
      this.vodSubsObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.vodSubsObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }
  }

  search(key:string,value: any) {
    const found = this.searchArray.find(element => Object.keys(element)[0] == key);
    if(found){
      this.searchArray.find(element => Object.keys(element)[0] == key)[key] = value;
    }else{
      var obj = {};
      obj[key]=value;
      this.searchArray.push(obj);
    }
		this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex*this.pagination_data.limit);
	}

  clearFilter(){
    this.searchArray =[];
    this.getData([],this.pagination_data.limit,0);
  }

}
