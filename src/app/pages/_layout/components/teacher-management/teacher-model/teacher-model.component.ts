import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/modules/auth';
import { TeacherService } from '../services/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { districts } from 'src/config/districts.config';
import { cities } from 'src/config/cities.config';
import { SubjectService } from '../../subject-management/services/subject.service';

@Component({
  selector: 'app-teacher-model',
  templateUrl: './teacher-model.component.html',
  styleUrls: ['./teacher-model.component.scss']
})
export class TeacherModelComponent implements OnInit {


  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  user: UserModel;
  subjectObj: any;
  districts = districts;
  cities = cities;
  availableCities = [];

  private subscriptions: Subscription[] = [];
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public teacherService: TeacherService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    // const sb = this.userService.currentUserSubject.asObservable().pipe(
    //   first(user => !!user)
    // ).subscribe(user => {
    //   this.user = Object.assign({}, user);
    //   this.firstUserState = Object.assign({}, user);
    //   // this.loadForm();
    // });
    // this.subscriptions.push(sb);
    this.getSubjects([{"status": "ACTIVE"}],1000,0);
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      profile_image: [''],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      password: ['', Validators.required],
      subject: ['', Validators.required],
      banner_image: ['', Validators.required],
      mobile_banner_image: ['', Validators.required],
    });
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

  uploadFile(key, event) {
    if(key == 'profile_image')
      this.formGroup.patchValue({
        profile_image: <File>event.target.files[0]
      });
    else if(key == 'banner_image')
      this.formGroup.patchValue({
        banner_image: <File>event.target.files[0]
      });
    else if(key == 'mobile_banner_image')
      this.formGroup.patchValue({
        mobile_banner_image: <File>event.target.files[0]
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {

    const formData = new FormData();
   
    formData.append('name',this.formGroup.get('name').value);
    formData.append('email', this.formGroup.get('email').value);
    formData.append('nic', this.formGroup.get('nic').value);
    formData.append('phone', this.formGroup.get('phone').value);
    formData.append('address',this.formGroup.get('address').value);
    formData.append('subject',this.formGroup.get('subject').value);
    formData.append('city', this.formGroup.get('city').value);
    formData.append('password', this.formGroup.get('password').value);
    formData.append('district', this.formGroup.get('district').value);
    formData.append('profile_image', this.formGroup.get('profile_image').value);
    formData.append('banner_image', this.formGroup.get('banner_image').value);
    formData.append('mobile_banner_image', this.formGroup.get('mobile_banner_image').value);
    formData.append('medium', 'SINHALA');
    const findSub = this.subjectObj.find((row:any)=>row.id === this.formGroup.get('subject').value);
    if(findSub && findSub.medium)
      formData.append('medium', findSub.medium);
    this.teacherService
      .saveTeacherDetails(formData)
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
  // cancel() {
  //   this.user = Object.assign({}, this.firstUserState);
  //   this.loadForm();
  // }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }

    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = '';
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
