import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactUsService } from '../services/contact-us.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact-us',
  templateUrl: './edit-contact-us.component.html',
  styleUrls: ['./edit-contact-us.component.scss']
})
export class EditContactUsComponent implements OnInit {

  formGroup: FormGroup;
  id:any;
  activeTabId = 1;
  contactUsResponse:any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,public contactUsService:ContactUsService,private toastr: ToastrService) { }

  ngOnInit(): void {

     this.id = this.route.snapshot.params.id;
     this.contactUsService.getContactUsById(this.id).subscribe((data:any)=>{
       this.contactUsResponse = data.data;
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


  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
