import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ReceiptService } from '../services/receipt.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipts-modal',
  templateUrl: './receipts-modal.component.html',
  styleUrls: ['./receipts-modal.component.scss']
})
export class ReceiptsModalComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private el: ElementRef, private receiptService: ReceiptService,private route: ActivatedRoute,
    private toastr: ToastrService,
    public modal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      phone: ['', Validators.required],
      teleshop_bank: ['', Validators.required],
      type: ['', Validators.required],
      student_name: ['', Validators.required],
      amount: ['', Validators.required]
  })
  }

  save() {

    const formData = new FormData();
    formData.append('amount', this.formGroup.get('amount').value);
    formData.append('student_name',this.formGroup.get('student_name').value);
    formData.append('phone',this.formGroup.get('phone').value);
    formData.append('teleshop_bank', this.formGroup.get('teleshop_bank').value);
    formData.append('type', this.formGroup.get('type').value);
    this.receiptService
      .saveCReceiptDetails(formData)
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
