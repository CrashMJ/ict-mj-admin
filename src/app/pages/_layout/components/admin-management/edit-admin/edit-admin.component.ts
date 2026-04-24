import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdminManagementService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {

  model: any;
  formGroup: FormGroup;
  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  id:any;
  adminResponse:any;
  // adminObj:any;
  constructor(private layout: LayoutService, private el: ElementRef, private fb: FormBuilder, private adminManagementService: AdminManagementService,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      role: ['', Validators.required],
      password: [''],
    });
    this.id = this.route.snapshot.params.id;
    this.adminManagementService.getAdminById(this.id).subscribe(data=>{
       this.adminResponse =data;
      let adminObj = this.adminResponse.data.admin;
      this.formGroup.get('name').setValue(adminObj.name);
      this.formGroup.get('address').setValue(adminObj.address);
      this.formGroup.get('phone').setValue(adminObj.phone);
      this.formGroup.get('email').setValue(adminObj.email);
      this.formGroup.get('nic').setValue(adminObj.nic);
      this.formGroup.get('role').setValue(adminObj.role);
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

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {
    // init code preview examples
    // see /src/assets/js/layout/extended/examples.js
    const elements = this.el.nativeElement.querySelectorAll('.example');
    // KTLayoutExamples.init(elements);
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    let adminObj:any = {
      id: this.id,
      email: this.f.email.value,
      name: this.f.name.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      nic: this.f.nic.value,
      role: this.f.role.value,
    };

    if(this.f.password.value){
      adminObj.password=this.f.password.value;
    }
    
    this.adminManagementService
    .updateAdminByAdmin(adminObj)
    .subscribe((data:any) => {
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }},
      err=>{
        this.toastr.error(err, 'Error')
      }
      // console.log(user)

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
  
  cancel(){}
  
}
