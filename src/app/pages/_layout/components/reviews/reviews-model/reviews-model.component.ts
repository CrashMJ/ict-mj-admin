import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TipInfoService } from "../services/reviews.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reviews-model",
  templateUrl: "./reviews-model.component.html",
  styleUrls: ["./reviews-model.component.scss"],
})
export class ReviewsModelComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public tipInfoService: TipInfoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      student_name: ["", Validators.required],
      image: ["", Validators.required],
      class_type: [""],
      comment: [""],
    });
  }

  uploadFile(key, event) {
    if (key == "image")
      this.formGroup.patchValue({
        image: <File>event.target.files[0],
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    const formData = new FormData();
    formData.append("student_name", this.formGroup.get("student_name").value);
    formData.append("image", this.formGroup.get("image").value);
    formData.append("class_type", this.formGroup.get("class_type").value);
    formData.append("comment", this.formGroup.get("comment").value);
    this.tipInfoService.saveTipAndInfoDetails(formData).subscribe(
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
        this.toastr.error(err, "Error");
      }
    );
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
