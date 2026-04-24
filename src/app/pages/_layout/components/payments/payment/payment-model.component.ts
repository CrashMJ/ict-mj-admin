import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { PaymentService } from "../services/payment.service";
import { SubjectService } from "../../subject-management/services/subject.service";

@Component({
  selector: "app-payment-model",
  templateUrl: "./payment-model.component.html",
  styleUrls: ["./payment-model.component.scss"],
})
export class PaymentModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  subjectObj: any;
  searchArray: any = [];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService
  ) {
    this.getDataCourses(this.searchArray, 100, 0);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      payment_type: ["bank", Validators.required],
      amount: ["", Validators.required],
      course_id: ["6", Validators.required],
      slip: ["", Validators.required],
      pay_level: ["", Validators.required],
      student_id: ["", Validators.required],
      bank_name: ["", Validators.required],
      branch_name: ["", Validators.required],
    });
  }

  getDataCourses(filter: any, limit: number, skip: number) {
    this.subjectService.getAllSubject(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.subjectObj = teacherList.data.results;

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
    formData.append("amount", this.formGroup.get("amount").value);
    formData.append("course_id", this.formGroup.get("course_id").value);
    formData.append("slip", this.formGroup.get("slip").value);
    formData.append("pay_level", this.formGroup.get("pay_level").value);
    formData.append("student_id", this.formGroup.get("student_id").value);
    formData.append("bank_name", this.formGroup.get("bank_name").value);
    formData.append("branch_name", this.formGroup.get("branch_name").value);

    this.paymentService.createPay(formData).subscribe(
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
