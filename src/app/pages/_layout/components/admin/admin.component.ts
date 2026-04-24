import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AddAdminModelComponent } from 'src/app/pages/_layout/components/admin/add-admin-model/add-admin-model.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  addNewAdmin() {
    const modalRef = this.modalService.open(AddAdminModelComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      // this.customerService.fetch(),
      () => { }
    );
    // this.edit(1);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(AddAdminModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      // this.customerService.fetch(),
      () => { }
    );
  }
}
