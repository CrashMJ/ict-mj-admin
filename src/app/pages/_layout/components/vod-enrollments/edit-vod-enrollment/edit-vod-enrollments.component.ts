import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VodEnrollService } from "../services/vod-enroll.service";
// import { lessonPurchaseService } from "../../lessons-purchase/services/lesson-purchase.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-edit-vod-enrollments",
  templateUrl: "./edit-vod-enrollments.component.html",
  styleUrls: ["./edit-vod-enrollments.component.scss"],
})
export class EditVodEnrollComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  id: any;
  paymentResponse: any;
  viewCountId: any;
  vodEnrollResponse: any;
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private vodEnrollService: VodEnrollService,
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
    this.vodEnrollService.getVodEnrollById(this.id).subscribe(
      (data: any) => {
        this.vodEnrollResponse = data.data;
        this.formGroup.get("status").setValue(this.vodEnrollResponse.status);
        this.cdr.markForCheck();
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
    this.updateService(this.formGroup.get("status").value);
  }

  reset() {
    // this.updateViewCount({
    //   counts: ""
    // });
  }

  updateService(formData: any) {
    this.submitting = true;
    this.vodEnrollService.editVodEnroll(formData, this.id).subscribe(
      (data: any) => {
        this.submitting = false;
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
        this.submitting = false;
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
  }

  // updateViewCount(formData) {
  //     this.submitting = true;
  //     lessonPurchaseService.getLessonPurchaseById(this.id).subscribe(
  //       (data: any) => {
  //         this.paymentResponse = data.data;
  //         this.viewCountId = this.paymentResponse.viewCount.id
          
  //       },
  //     lessonPurchaseService.updateLessonViewCount(formData, this.viewCountId).subscribe(
  //       (data: any) => {
  //         this.submitting = false;
  
  //         // this.paymentResponse = data.data;
  //         this.cdr.markForCheck();
  //         if (data.statusCode === 200) {
  //           this.toastr.success(data.message, "Success");
  //         } else if (data.statusCode === 400) {
  //           this.toastr.warning(data.message, "Warning");
  //         } else {
  //           this.toastr.warning("Something Went Wrong", "Error!");
  //         }
  //       },
  //       (err) => {
  //         if (err.error && err.error.message) {
  //           this.toastr.error(err.error.message, "Error");
  //           this.toastr.error(JSON.stringify(err.error.errors), "Error");
  //         } else this.toastr.warning("Something Went Wrong", "Error!");
  //       }
  //     )
  //   }

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {
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
