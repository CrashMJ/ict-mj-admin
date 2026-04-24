import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { OptionService } from '../../option-management/service/option.service';
import { UserModel } from 'src/app/modules/auth';
import { districts } from 'src/config/districts.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampusContactUsService } from '../service/campus-contactUs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campus-contact-modal',
  templateUrl: './campus-contact-modal.component.html',
  styleUrls: ['./campus-contact-modal.component.scss']
})
export class CampusContactModalComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  user: UserModel;
  subjectObj: any;
  districts = districts;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  optionObj:any;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private campusContactUsService: CampusContactUsService,
    private toastr: ToastrService,
    private optionService: OptionService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      after_al_option_id: ["", Validators.required],
    });
    
    this.getOptions([{ status: "ACTIVE" }], 1000, 0);
  }

  get f() {
    return this.formGroup.controls;
  }

  getOptions(filter: any, limit: number, skip: number) {
    this.optionService.getAllOption(filter, limit, skip).subscribe(
      (intitituteList: any) => {
        this.optionObj = intitituteList.data.results;
        console.log(this.optionObj, intitituteList)
        this.cdr.markForCheck();
      },
      (error) => {
        console.log(error); // The error is here
      }
    );
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
    formData.append("phone", this.formGroup.get("phoneNumber").value);
    formData.append("after_al_option_id", this.formGroup.get("after_al_option_id").value);
    this.campusContactUsService.saveCampusContactUsDetails(formData)
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
