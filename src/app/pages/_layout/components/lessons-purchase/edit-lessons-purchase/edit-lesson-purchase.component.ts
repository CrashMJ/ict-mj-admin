import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserModel } from "src/app/modules/auth";
import { LessonPurchaseService } from "../services/lesson-purchase.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-edit-lesson-purchase",
  templateUrl: "./edit-lesson-purchase.component.html",
  styleUrls: ["./edit-lesson-purchase.component.scss"],
})
export class EditLessonPurchaseComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  user: UserModel;
  paymentResponse: any;
  id: any;
  viewCountId: any;
  fileToUpload: File = null;
  submitting = false;

  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  displayedColumns3: string[] = [
    "id",
    "name",
    "grade_type",
    "duration",
    "paid_type",
    "price"
  ];
  dataSource3: MatTableDataSource<any>;
  pagination_item_counts2 = environment.pagination_item_counts;
  pagination_data2 = environment.pagination_data;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private lessonPurchaseService: LessonPurchaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchLessonPurchaseDetails();
  }
  
  private initializeForm() {
    // this.formGroup = this.fb.group({
    //   videoName: ['', Validators.required],
    //   studentName: ['', Validators.required],
    //   days: ['', Validators.required],
    //   start_date: ['', Validators.required],
    //   end_date: ['', Validators.required],
    //   discount_price: ['', Validators.required],
    //   total_price: ['', Validators.required],
    //   status: ['', Validators.required],
    //   payment_status: ['', Validators.required],
    //   type: ['', Validators.required],
    //   grade: ['', Validators.required],
    // });
    this.formGroup = this.fb.group({
      commission_eligibility: [false, Validators.required],
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      status: ["", Validators.required],
      payment_status: ["", Validators.required],
    });
  }
  
  private fetchLessonPurchaseDetails() {
    this.id = this.route.snapshot.params.id;
    this.lessonPurchaseService.getLessonPurchaseById(this.id).subscribe(
      (data: any) => {
        this.paymentResponse = data.data;
        console.log('this.paymentResponse 1',this.paymentResponse)

        if(this.paymentResponse.viewCount){
          this.viewCountId = this.paymentResponse.viewCount.id
        }else{
          this.viewCountId = 0;
        }
       
        console.log('this.paymentResponse',this.paymentResponse)
        this.formGroup.patchValue({
          videoName: this.paymentResponse.videoSell.name,
          studentName: this.paymentResponse.student.fname,
          days: this.paymentResponse.days,
          start_date: this.paymentResponse.start_date,
          end_date: this.paymentResponse.end_date,
          discount_price: this.paymentResponse.discount_price,
          total_price: this.paymentResponse.total_price,
          status: this.paymentResponse.status,
          type: this.paymentResponse.videoSell.type,
          grade: this.paymentResponse.videoSell.grade,
          payment_status: this.paymentResponse.payment_status,
          commission_eligibility: this.paymentResponse.commission_eligibility,
        });
        this.dataSource3 = new MatTableDataSource(
          this.paymentResponse.videoSell.videoPackages || []
        );
      },
      (error) => {
        this.toastr.error('Failed to fetch lesson purchase details.', 'Error');
      }
    );
  }
    

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    return tabId === this.activeTabId ? "active" : "";
  }

  save() {
    this.updateService({
      commission_eligibility: this.formGroup.get("commission_eligibility").value,
      start_date: this.formGroup.get("start_date").value,
      end_date: this.formGroup.get("end_date").value,
      status: this.formGroup.get("status").value,
      payment_status: this.formGroup.get("payment_status").value,
    });
  }

  reset() {
    this.updateViewCount({
      counts: ""
    });
  }

  updateService(formData) {
    this.submitting = true;

    this.lessonPurchaseService.updateLessonPurchaseDetails(formData, this.id).subscribe(
      (data: any) => {
        this.submitting = false;

        this.paymentResponse = data.data;
        this.cdr.markForCheck();
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
  }

  updateViewCount(formData) {
    this.submitting = true;

    this.lessonPurchaseService.updateLessonViewCount(formData, this.viewCountId).subscribe(
      (data: any) => {
        this.submitting = false;

        // this.paymentResponse = data.data;
        this.cdr.markForCheck();
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
