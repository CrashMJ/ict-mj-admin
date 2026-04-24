import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { LessonPurchaseService } from "../services/lesson-purchase.service";
import { LessonService } from "../../lessons/services/lesson.service";

@Component({
  selector: "app-lesson-purchase-model",
  templateUrl: "./lessons-purchase-model.component.html",
  styleUrls: ["./lessons-purchase-model.component.scss"],
})
export class LessonPurchaseModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  lessonObj: any;
  searchArray: any = [{"status": "active"}];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public lessonPurchaseService: LessonPurchaseService,
    private cdr: ChangeDetectorRef,
    private lessonService: LessonService
  ) {
    this.getDataLessons(this.searchArray, 100, 0);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      payment_type: ["bank", Validators.required],
      price: ["", Validators.required],
      video_id: ["", Validators.required],
      slip: ["", Validators.required],
      student_id: ["", Validators.required],
      bank_name: ["", Validators.required],
      branch_name: ["", Validators.required],
      days: ["", Validators.required],
    });
  }

  getDataLessons(filter: any, limit: number, skip: number) {
console.log('filter', filter)

    this.lessonService.getAllLessons(filter, limit, skip).subscribe(
      (lessonList: any) => {
        this.lessonObj = lessonList.data.results;
console.log('this.lessonObj', this.lessonObj)
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  save() {
    const formData = new FormData();
    formData.append("payment_type", this.formGroup.get("payment_type").value);
    formData.append("price", this.formGroup.get("price").value);
    formData.append("video_id", this.formGroup.get("video_id").value);
    formData.append("slip", this.formGroup.get("slip").value);
    formData.append("student_id", this.formGroup.get("student_id").value);
    formData.append("bank_name", this.formGroup.get("bank_name").value);
    formData.append("branch_name", this.formGroup.get("branch_name").value);
    formData.append("days", this.formGroup.get("days").value);

    this.lessonPurchaseService.createLessonPurchase(formData).subscribe(
      (data) => {
        console.log(data.statusCode);
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
          this.modal.close("Close click");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {
        if (err.error.message) {
          this.toastr.error(err.message, "Error");
        }
        this.toastr.error(JSON.stringify(err.error), "Error");
      }
      // console.log(user)
    );
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      slip: <File>event.target.files[0],
    });
    this.formGroup.get(key).updateValueAndValidity();
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  deletePic() {
    // this.user.pic = '';
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
