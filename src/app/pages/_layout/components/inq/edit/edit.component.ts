import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InqService } from "../services/inq.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-edit-inq",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditInqComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  id: any;
  tipInfoResponse: any;
  fileToUpload: File = null;

  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private inqService: InqService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      student_name: ["", Validators.required],
      student_phone: ["", Validators.required],
      class_grade: ["", Validators.required],
      exam_year: ["", Validators.required],
      comment: [""],
    });

    this.id = this.route.snapshot.params.id;
    this.inqService.getTipInfoById(this.id).subscribe(
      (data: any) => {
        this.tipInfoResponse = data.data;
        this.formGroup.get("student_name").setValue(this.tipInfoResponse.student_name);
        this.formGroup.get("student_phone").setValue(this.tipInfoResponse.student_phone);
        this.formGroup.get("class_grade").setValue(this.tipInfoResponse.class_grade);
        this.formGroup.get("exam_year").setValue(this.tipInfoResponse.exam_year);
        this.formGroup.get("comment").setValue(this.tipInfoResponse.comment);
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


  updateService(formData: any) {
    this.submitting = true;
    this.inqService.editTipAndInfoDetails(formData, this.id).subscribe(
      (data: any) => {
        this.submitting = false;
        this.tipInfoResponse = data.data;
        this.cdr.markForCheck();
        console.log(this.tipInfoResponse);
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

  ngAfterViewInit() {
    // init code preview examples
    // see /src/assets/js/layout/extended/examples.js
    const elements = this.el.nativeElement.querySelectorAll(".example");
    // KTLayoutExamples.init(elements);
  }

  save() {
    this.updateService({
      student_name: this.formGroup.get("student_name").value,
      student_phone: this.formGroup.get("student_phone").value,
      class_grade: this.formGroup.get("class_grade").value,
      exam_year: this.formGroup.get("exam_year").value,
      comment: this.formGroup.get("comment").value,
    });
  }

  getPic() {}

  deletePic() {}

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }
}
