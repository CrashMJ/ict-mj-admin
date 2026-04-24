import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from '../service/institute.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-institute-modal',
  templateUrl: './institute-modal.component.html',
  styleUrls: ['./institute-modal.component.scss']
})
export class InstituteModalComponent implements OnInit {

  formGroup: FormGroup;
  
  submitting= false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,private instituteService: InstituteService,private modalService: NgbModal,
    public modal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      image: [''],
      name: ['', Validators.required]
    });
  }

  
  uploadFile(key, event) {
    if(key == 'image')
      this.formGroup.patchValue({
        image: <File>event.target.files[0]
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    const formData = new FormData();
    formData.append('name', this.formGroup.get('name').value);
    formData.append('image', this.formGroup.get('image').value);
    
   this.submitting = true;
    this.instituteService
    .saveInstituteDetails(formData)
    .subscribe((data:any) => {
      this.submitting = false;
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
      this.modal.close('Close click');
    },
      err=>{
        this.submitting = false;
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      }
    );
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
