import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { UserModel } from "src/app/modules/auth";
import { StudentService } from "src/app/pages/_layout/components/student-management/services/student.service";

import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../../subject-management/services/subject.service";
import { districts } from "src/config/districts.config";
@Component({
  selector: "app-student-model",
  templateUrl: "./student-model.component.html",
  styleUrls: ["./student-model.component.scss"],
})
export class StudentModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  user: UserModel;
  subjectObj: any;
  districts = districts;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,

    private studentService: StudentService,
    private toastr: ToastrService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.getSubjects([{"status": "ACTIVE"}],1000,0);
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      image: [""],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      nic: ["", Validators.required],
      city: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
      district: ["", Validators.required],
      hear_about_us: ["", Validators.required],
      stream: ["", Validators.required],
      subject_1_id: ["", Validators.required],
      subject_2_id: ["", Validators.required],
      subject_3_id: ["", Validators.required],
      al_year: ["", Validators.required],
    });
  }

  get f() {
    return this.formGroup.controls;
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
    formData.append("email", this.formGroup.get("email").value);
    formData.append("name", this.formGroup.get("name").value);
    formData.append("address", this.formGroup.get("address").value);
    formData.append("phone", this.formGroup.get("phoneNumber").value);
    formData.append("nic", this.formGroup.get("nic").value);
    formData.append("image", this.formGroup.get("image").value);
    formData.append("city", this.formGroup.get("city").value);
    formData.append("district", this.formGroup.get("district").value);
    formData.append("hear_about_us", this.formGroup.get("hear_about_us").value);
    formData.append("stream", this.formGroup.get("stream").value);
    formData.append("subject_1_id", this.formGroup.get("subject_1_id").value);
    formData.append("subject_2_id", this.formGroup.get("subject_2_id").value);
    formData.append("subject_3_id", this.formGroup.get("subject_3_id").value);
    formData.append(
      "confirm_password",
      this.formGroup.get("confirm_password").value
    );
    formData.append("password", this.formGroup.get("password").value);
    formData.append("al_year", this.formGroup.get("al_year").value);

    // formData.append('city',"adada");
    console.log(formData, this.formGroup.get("email").value);
    this.studentService.saveStudenDetails(formData)
      .subscribe((data:any) => {
        console.log(data)
        if(data.statusCode === 200){
          this.toastr.success(data.message, 'Success')
          this.modal.close('Close click');
        }
        else if(data.statusCode === 400){
          this.toastr.warning(data.message, 'Warning')
        }
        else{
          this.toastr.warning('Something Went Wrong', 'Error!')
        }
      },
        err=>{
          if(err.error && err.error.message){
            this.toastr.error(err.error.message, 'Error');
            this.toastr.error(JSON.stringify(err.error.errors), 'Error');
          }
          else
            this.toastr.warning('Something Went Wrong', 'Error!')
        }
    );
  }

  getSubjects(filter: any, limit: number, skip: number) {
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

  // save() {
  //   const formData = new FormData();
  //   formData.append('file', 'this.uploadForm.get(');
  //   console.log(formData)
  //   // this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
  //   //   (res) => console.log(res),
  //   //   (err) => console.log(err)
  //   // );
  // }
  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = "";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
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
