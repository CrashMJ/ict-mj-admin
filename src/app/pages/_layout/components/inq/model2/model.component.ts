import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { InqService } from "../services/inq.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-inq-model2",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class InqModel2Component implements OnInit {
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
      inquiry_csv: ["", Validators.required],
    });
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      inquiry_csv: <File>event.target.files[0],
    });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    const formData = new FormData();
    formData.append('inquiry_csv',  this.formGroup.get("inquiry_csv").value);
    this.inqService.uploadInqFile(formData).subscribe(
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
