import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankSubscriptionService } from '../services/bankSubscription.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-bank-subscriptions',
  templateUrl: './edit-bank-subscriptions.component.html',
  styleUrls: ['./edit-bank-subscriptions.component.scss']
})
export class EditBankSubscriptionsComponent implements OnInit {
  model: any;

  activeTabId = 1;

  id: any;
  payLog: any;
  log: any = {};
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  formGroup: FormGroup;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private bankSubscriptionService: BankSubscriptionService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.formGroup = this.fb.group({
      status: ["", Validators.required],
      number_of_months: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.id = this.route.snapshot.params.id;
    this.bankSubscriptionService.getSltSubscriptionById(this.id).subscribe(
      (data: any) => {
        this.payLog = data.data;
        this.formGroup.get("status").setValue(this.payLog.status);
        this.formGroup.get("number_of_months").setValue(this.payLog.number_of_months);
        // console.log("asad,",this.payLog);
        this.log = this.payLog;
        // console.log(this.log);
      },
      (error) => {
      }
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

  save() {
    this.updateService(this.formGroup.get("status").value,this.formGroup.get("number_of_months").value);
  }

  updateService(status: any, number_of_months: any) {
    this.submitting = true;
    this.bankSubscriptionService.editVodSubscription(status, number_of_months, this.id).subscribe(
      (data: any) => {
        this.submitting = false;
        // this.payLog = data.data;

        this.cdr.markForCheck();

        if (data.statusCode === 200) {
          this.toastr.success("Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        this.submitting = false;
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else this.toastr.warning("Something Went Wrong", "Error!");
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
