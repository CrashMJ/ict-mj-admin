import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from '../services/coupon.service';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.component.html',
  styleUrls: ['./coupon-modal.component.scss']
})
export class CouponModalComponent implements OnInit {

  formGroup: FormGroup;
  submitting= false;

  constructor(
    public couponService: CouponService,
    private fb: FormBuilder,public modal: NgbActiveModal,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      student_id: ['', Validators.required],
      purchase: ['', Validators.required],
      type: ['', Validators.required],
      usage_count: ['', Validators.required],

    });
  }

  save() {
    const formData = {
      "type": this.formGroup.get('type').value,
      "purchase": this.formGroup.get('purchase').value,
      "student_id": this.formGroup.get('student_id').value,
      "usage_count": this.formGroup.get('usage_count').value
     };
    
    this.submitting = true;
    this.couponService
    .saveCouponDetails(formData)
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
