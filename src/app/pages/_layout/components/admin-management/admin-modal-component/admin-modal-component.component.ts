import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { CustomAdapter, CustomDateParserFormatter, getDateFromString } from '../../../../../_metronic/core';
import { Customer } from 'src/app/modules/e-commerce/_models/customer.model';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { AdminManagementService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

const EMPTY_CUSTOMER: Customer = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  gender: 'Female',
  status: 2,
  dob: undefined,
  dateOfBbirth: '',
  ipAddress: '251.237.126.210',
  type: 2
};
@Component({
  selector: 'app-admin-modal-component',
  templateUrl: './admin-modal-component.component.html',
  styleUrls: ['./admin-modal-component.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})

export class AdminModalComponentComponent implements OnInit, OnDestroy {

  @Input() id: number;
  isLoading$;
  customer: Customer;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    public adminManagementService:AdminManagementService,
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.isLoading$ = this.customersService.isLoading$;
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.loadCustomer();
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    let adminObj = {
      email: this.f.email.value,
      name: this.f.name.value,
      address: this.f.address.value,
      phone: this.f.phoneNumber.value,
      nic: this.f.nic.value,
      role: this.f.role.value,
      password: this.f.password.value,

    };
    console.log(adminObj);

    // const formData = new FormData();
    // formData.append('email',  this.f.email.value);
    // formData.append('name',this.f.name.value);
    // formData.append('address',this.f.address.value);
    // formData.append('phoneNumber', this.f.phoneNumber.value);
    // formData.append('role', this.f.role.value);
    // formData.append('nic', this.f.nic.value);
    // formData.append('password',  this.f.password.value);
    
    // // formData.append('city',"adada");
    // console.log(formData, this.formGroup.get('email').value)
    this.adminManagementService
      .saveAdminDetails(adminObj)
      .subscribe(data => {
        console.log(data.statusCode);
        if(data.statusCode === 200){
          this.toastr.success(data.message, 'Success')
          this.modal.close('Close click');
        }
        else if(data.statusCode === 400){
          this.toastr.warning(data.message, 'Warning')
        }},
        err=>{
          this.toastr.error(err, 'Error')
        }
        // console.log(user)

      );

    // this.prepareCustomer();
    // if (this.customer.id) {
    //   this.edit();
    // } else {
    //   this.create();
    // }
  }



  ngOnDestroy(): void {
    // this.subscriptions.forEach(sb => sb.unsubscribe());
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
