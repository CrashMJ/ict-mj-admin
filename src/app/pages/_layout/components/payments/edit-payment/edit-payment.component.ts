import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PaymentService } from "../services/payment.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { CouponService } from "../../coupon-management/services/coupon.service";

@Component({
  selector: "app-edit-payment",
  templateUrl: "./edit-payment.component.html",
  styleUrls: ["./edit-payment.component.scss"],
})
export class EditPaymentComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  id: any;
  bankPayId: any;
  paymentResponse: any;
  coupon: any;
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    public couponService: CouponService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      commission_eligibility: [false, Validators.required],
      status: ["", Validators.required],
      paid_date: ["", Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.paymentService.getPaymentById(this.id).subscribe(
      (data: any) => {
        this.paymentResponse = data.data;
        this.bankPayId = this.paymentResponse && this.paymentResponse.bankPayments ? this.paymentResponse.bankPayments.id : this.id;
        this.formGroup.get("commission_eligibility").setValue(this.paymentResponse.commission_eligibility);
        this.formGroup.get("status").setValue(this.paymentResponse.status);
        this.formGroup.get("paid_date").setValue(this.paymentResponse.paid_date);
        this.cdr.markForCheck();
        console.log(this.paymentResponse);
      },
      (error) => {}
    );
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

  updateService(commission_eligibility: boolean, status: any, paid_date: any) {
    this.submitting = true;
    this.paymentService.editPayment(commission_eligibility, status, paid_date, this.bankPayId).subscribe(
      (data: any) => {
        this.submitting = false;
        this.cdr.markForCheck();
        console.log(this.paymentResponse);
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        this.submitting = false;
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
  }

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {}

  save() {
    this.updateService(this.formGroup.get("commission_eligibility").value, this.formGroup.get("status").value, this.formGroup.get("paid_date").value);
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid2(controlName: string): boolean {
    const control = this.formGroup3.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid2(controlName: string): boolean {
    const control = this.formGroup3.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
