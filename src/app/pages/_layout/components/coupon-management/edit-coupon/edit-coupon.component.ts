import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponService } from '../services/coupon.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {

  formGroup: FormGroup;
  activeTabId = 1;
  id:any;
  couponResponse:any;
  studentObj:any;
  p: number = 1;

  submitting= false;

  displayedColumns: string[] = [ 'id','type','status','created_at','video_id','video_code','title','price'];
  dataSource:any;

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef ,private couponService: CouponService,private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      status: ['', Validators.required],
      type: ['', Validators.required],
      usage_count: ['', Validators.required],

    });

    
    this.id = this.route.snapshot.params.id;
    this.couponService.getCouponById(this.id).subscribe((data:any)=>{
      console.log(data+"asdadad")
      this.couponResponse =data.data;
      this.dataSource = this.couponResponse.enrolments;
      this.formGroup.get('status').setValue(this.couponResponse.status);
      this.formGroup.get('type').setValue(this.couponResponse.type);
      this.formGroup.get('usage_count').setValue(this.couponResponse.usage_count);
      this.cdr.markForCheck();
    },error=>{
    });
  }

  
  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }


  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }

    return 'active';
  }
  
  
  save() {
    const formData = {
      "status": this.formGroup.get('status').value,
      "type": this.formGroup.get('type').value,
      "usage_count": this.formGroup.get('usage_count').value,
    };

    this.couponService
      .updateCouponDetails(formData,this.id)
      .subscribe(data => {
        console.log(data.statusCode);
        this.cdr.markForCheck();
        this.couponResponse = data.data;
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

  delete(id:any){}
}
