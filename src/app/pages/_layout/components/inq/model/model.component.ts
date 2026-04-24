import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { InqService } from "../services/inq.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-inq-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class InqModelComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public inqService: InqService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      student_name: ["", Validators.required],
      student_phone: ["", Validators.required],
      class_grade: ["", Validators.required],
      exam_year: ["", Validators.required],
      comment: [""],
    });
  }

  save() {
    this.inqService.saveTipAndInfoDetails({
      student_name: this.formGroup.get("student_name").value,
      student_phone: this.formGroup.get("student_phone").value,
      class_grade: this.formGroup.get("class_grade").value,
      exam_year: this.formGroup.get("exam_year").value,
      comment: this.formGroup.get("comment").value,
    }).subscribe(
      (data) => {
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
