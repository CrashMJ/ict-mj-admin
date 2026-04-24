import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactUsService } from '../services/contact-us.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss']
})
export class ContactUsModalComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,public contactUsService:ContactUsService,private toastr: ToastrService,
    public modal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      status: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['', Validators.required],
     });

   
  }

  save() {

    const formData = new FormData();
    formData.append('email', this.formGroup.get('email').value);
    formData.append('name',this.formGroup.get('name').value);
    formData.append('status',this.formGroup.get('status').value);
    formData.append('message', this.formGroup.get('message').value);
    formData.append('phone', this.formGroup.get('phone').value);
    
    // formData.append('city',"adada");
    console.log(formData, this.formGroup.get('email').value)
    this.contactUsService
      .saveContactUsDetails(formData)
      .subscribe(data => {
        console.log(data.statusCode);
        if(data.statusCode === 200){
          this.toastr.success(data.message, 'Success')
        }
        else if(data.statusCode === 400){
          this.toastr.warning(data.message, 'Warning')
        }},
        err=>{
          this.toastr.error(err, 'Error')
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
