import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TipInfoService } from "../services/faq.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-faq-model",
  templateUrl: "./faq-model.component.html",
  styleUrls: ["./faq-model.component.scss"],
})
export class FaqModelComponent implements OnInit {
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
      question_en: ["", Validators.required],
      answer_en: ["", Validators.required],
      question_sn: [""],
      answer_sn: [""],
      image: ["", Validators.required],
    });
  }

  save() {
    const formData = new FormData();
    formData.append("question_en", this.formGroup.get("question_en").value);
    formData.append("answer_en", this.formGroup.get("answer_en").value);
    formData.append("question_sn", this.formGroup.get("question_sn").value);
    formData.append("answer_sn", this.formGroup.get("answer_sn").value);
    formData.append("image", this.formGroup.get("image").value);

    this.tipInfoService.saveTipAndInfoDetails(formData).subscribe(
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

  uploadFile(key, event) {
    this.formGroup.patchValue({
      image: <File>event.target.files[0],
    });
    this.formGroup.get(key).updateValueAndValidity();
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
