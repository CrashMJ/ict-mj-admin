import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiptService } from '../services/receipt.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-receipts',
  templateUrl: './edit-receipts.component.html',
  styleUrls: ['./edit-receipts.component.scss']
})
export class EditReceiptsComponent implements OnInit {

  formGroup: FormGroup;
  id:any;
  activeTabId = 1;
  receiptResponse:any;
  constructor(private fb: FormBuilder, private el: ElementRef, private receiptService: ReceiptService,private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params.id;
    this.formGroup = this.fb.group({
      phone: ['', Validators.required],
      teleshop_bank: ['', Validators.required],
      type: ['', Validators.required],
      student_name: ['', Validators.required],
      amount: ['', Validators.required]
  })
    this.receiptService.getReceiptById(this.id).subscribe(data=>{
      console.log(data+"asdadad")
       this.receiptResponse =data;
      let receiptObj = this.receiptResponse.data;
      this.formGroup.get('phone').setValue(receiptObj.phone);
      this.formGroup.get('teleshop_bank').setValue(receiptObj.teleshop_bank);
      this.formGroup.get('type').setValue(receiptObj.type);
      this.formGroup.get('student_name').setValue(receiptObj.student_name);
      this.formGroup.get('amount').setValue(receiptObj.amount);
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

  const formData = new FormData();
  formData.append('email', this.formGroup.get('email').value);
  formData.append('name',this.formGroup.get('name').value);
  formData.append('address',this.formGroup.get('address').value);
  formData.append('phone', this.formGroup.get('phoneNumber').value);
  formData.append('nic', this.formGroup.get('nic').value);
  this.receiptService
    .updateReceiptDetails(formData,this.id)
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
