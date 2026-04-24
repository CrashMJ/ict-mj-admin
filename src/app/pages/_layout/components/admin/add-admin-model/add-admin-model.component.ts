import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin-model',
  templateUrl: './add-admin-model.component.html',
  styleUrls: ['./add-admin-model.component.scss']
})
export class AddAdminModelComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  save() {
  }

}
